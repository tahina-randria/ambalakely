-- ============================================================================
-- Hôtel Ambalakely — PMS core (Palier 1 : réservations + disponibilité)
-- ----------------------------------------------------------------------------
-- Principes (état de l'art, non négociables) :
--  • Argent en entier (plus petite unité, bigint) + devise ISO. Jamais de float.
--  • Occupation modélisée en créneaux horaires (tstzrange) → gère nuitée,
--    day-use, et day-use + nuitée le même jour sur la même chambre.
--  • Surbooking rendu IMPOSSIBLE par la base : contrainte GiST EXCLUDE
--    (room_id =, occupancy &&), pas seulement par le code applicatif.
--  • Réservation par TYPE de chambre ; chambre physique assignable à tout moment.
--  • Traçabilité (reservation_event), zéro suppression dure, RLS verrouillé.
-- ============================================================================

create extension if not exists btree_gist;  -- requis par EXCLUDE (uuid = + range &&)

-- ---- enums -----------------------------------------------------------------
create type reservation_status  as enum ('pending','confirmed','checked_in','checked_out','cancelled','no_show');
create type reservation_channel as enum ('direct','email','phone','walk_in','ota');
create type stay_type           as enum ('overnight','day_use');
create type housekeeping_status as enum ('clean','dirty','inspected','out_of_order');

-- ---- helper : updated_at automatique --------------------------------------
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ---- property (l'hôtel — 1 ligne, FK partout pour rester extensible) -------
create table property (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  slug           text not null unique,
  timezone       text not null default 'Indian/Antananarivo',
  currency       char(3) not null default 'MGA',
  check_in_time  time not null default '13:00',
  check_out_time time not null default '11:00',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create trigger property_set_updated_at before update on property for each row execute function set_updated_at();

-- ---- room_type (Supérieure / Confort / Standard) --------------------------
create table room_type (
  id                  uuid primary key default gen_random_uuid(),
  property_id         uuid not null references property(id) on delete restrict,
  slug                text not null,
  name                text not null,
  description         text,
  base_occupancy      smallint not null default 2 check (base_occupancy >= 1),
  max_occupancy       smallint not null check (max_occupancy >= base_occupancy),
  size_sqm            smallint,
  base_price_minor    bigint not null check (base_price_minor >= 0),   -- prix nuitée par défaut (fallback du calendrier)
  day_use_price_minor bigint check (day_use_price_minor >= 0),         -- prix day-use par défaut
  currency            char(3) not null default 'MGA',
  sort                smallint not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (property_id, slug)
);
create trigger room_type_set_updated_at before update on room_type for each row execute function set_updated_at();

-- ---- room (les 10 chambres physiques) -------------------------------------
create table room (
  id                  uuid primary key default gen_random_uuid(),
  property_id         uuid not null references property(id) on delete restrict,
  room_type_id        uuid not null references room_type(id) on delete restrict,
  code                text not null,                 -- numéro : '14','1',...
  name                text,                          -- ex : 'Rogaland Suite'
  housekeeping_status housekeeping_status not null default 'clean',
  is_active           boolean not null default true,
  sort                smallint not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (property_id, code)
);
create index room_room_type_idx on room (room_type_id);
create trigger room_set_updated_at before update on room for each row execute function set_updated_at();

-- ---- rate_plan (plans tarifaires ; 1 défaut max par établissement) --------
create table rate_plan (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references property(id) on delete restrict,
  code        text not null,
  name        text not null,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (property_id, code)
);
create unique index rate_plan_one_default on rate_plan (property_id) where is_default;
create trigger rate_plan_set_updated_at before update on rate_plan for each row execute function set_updated_at();

-- ---- daily_rate (calendrier : prix par date × type × plan × type de séjour)
create table daily_rate (
  id           uuid primary key default gen_random_uuid(),
  rate_plan_id uuid not null references rate_plan(id) on delete cascade,
  room_type_id uuid not null references room_type(id) on delete cascade,
  date         date not null,
  stay_type    stay_type not null default 'overnight',
  amount_minor bigint not null check (amount_minor >= 0),
  currency     char(3) not null default 'MGA',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (rate_plan_id, room_type_id, date, stay_type)
);
create index daily_rate_lookup_idx on daily_rate (room_type_id, date);
create trigger daily_rate_set_updated_at before update on daily_rate for each row execute function set_updated_at();

-- ---- guest -----------------------------------------------------------------
create table guest (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references property(id) on delete restrict,
  first_name  text not null,
  last_name   text not null,
  email       text,
  phone       text,
  country     char(2),                 -- ISO 3166-1 alpha-2
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index guest_email_idx on guest (property_id, lower(email));
create trigger guest_set_updated_at before update on guest for each row execute function set_updated_at();

-- ---- reservation -----------------------------------------------------------
create table reservation (
  id              uuid primary key default gen_random_uuid(),
  property_id     uuid not null references property(id) on delete restrict,
  reference       text not null unique,        -- ref lisible, ex : 'AMB-7F3K2'
  guest_id        uuid not null references guest(id) on delete restrict,
  status          reservation_status not null default 'pending',
  channel         reservation_channel not null default 'direct',
  check_in        date not null,
  check_out       date not null,
  adults          smallint not null default 1 check (adults >= 1),
  children        smallint not null default 0 check (children >= 0),
  currency        char(3) not null default 'MGA',
  total_minor     bigint not null default 0 check (total_minor >= 0),
  notes           text,
  hold_expires_at timestamptz,                 -- expiration d'une option (statut pending)
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  check (check_out >= check_in)
);
create index reservation_dates_idx  on reservation (check_in, check_out);
create index reservation_status_idx on reservation (status);
create index reservation_guest_idx  on reservation (guest_id);
create trigger reservation_set_updated_at before update on reservation for each row execute function set_updated_at();

-- ---- reservation_room (lignes + garde anti-surbooking) --------------------
create table reservation_room (
  id               uuid primary key default gen_random_uuid(),
  reservation_id   uuid not null references reservation(id) on delete cascade,
  room_type_id     uuid not null references room_type(id) on delete restrict,
  room_id          uuid references room(id) on delete restrict,        -- null tant que non assignée
  rate_plan_id     uuid references rate_plan(id) on delete set null,
  stay_type        stay_type not null default 'overnight',
  check_in_at      timestamptz not null,
  check_out_at     timestamptz not null,
  -- dérivé des deux instants → ne peut jamais diverger
  occupancy        tstzrange not null generated always as (tstzrange(check_in_at, check_out_at, '[)')) stored,
  adults           smallint not null default 1 check (adults >= 1),
  children         smallint not null default 0 check (children >= 0),
  amount_minor     bigint not null default 0 check (amount_minor >= 0),
  currency         char(3) not null default 'MGA',
  blocks_inventory boolean not null default true,   -- mis à false quand la résa est annulée / no_show
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  check (check_out_at > check_in_at)
);
-- LA garde : une chambre physique assignée ne peut jamais avoir deux
-- occupations qui se chevauchent dans le temps. Impossible au niveau base.
alter table reservation_room
  add constraint reservation_room_no_overlap
  exclude using gist (room_id with =, occupancy with &&)
  where (room_id is not null and blocks_inventory);
-- dispo par type : compter les occupations d'un type sur une fenêtre
create index reservation_room_type_occ_idx on reservation_room using gist (room_type_id, occupancy) where (blocks_inventory);
create index reservation_room_reservation_idx on reservation_room (reservation_id);
create trigger reservation_room_set_updated_at before update on reservation_room for each row execute function set_updated_at();

-- ---- reservation_event (journal d'audit) ----------------------------------
create table reservation_event (
  id             uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservation(id) on delete cascade,
  type           text not null,        -- 'created','status_changed','room_assigned','modified','cancelled',...
  actor          text,                 -- id staff / 'system' / 'guest'
  data           jsonb not null default '{}',
  created_at     timestamptz not null default now()
);
create index reservation_event_res_idx on reservation_event (reservation_id, created_at);

-- ---- RLS : tout verrouillé par défaut -------------------------------------
-- L'app passe par Drizzle (rôle postgres) qui contourne le RLS. Activer le RLS
-- SANS policy = les rôles PostgREST (anon / authenticated) n'ont AUCUN accès
-- tant qu'on n'a pas ajouté de policies staff (phase auth). Défaut = deny-all.
alter table property         enable row level security;
alter table room_type        enable row level security;
alter table room             enable row level security;
alter table rate_plan        enable row level security;
alter table daily_rate       enable row level security;
alter table guest            enable row level security;
alter table reservation      enable row level security;
alter table reservation_room enable row level security;
alter table reservation_event enable row level security;
