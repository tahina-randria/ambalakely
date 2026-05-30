-- ============================================================================
-- Synchronise reservation_room.blocks_inventory depuis reservation.status.
-- ----------------------------------------------------------------------------
-- La dispo ne compte que les lignes blocks_inventory = true. Sans ce trigger,
-- une résa annulée / no_show continuerait de bloquer la chambre pour toujours.
-- Garanti par la base, pas par le code app. Idempotent.
--   • annulée / no_show  → blocks_inventory = false (libère l'inventaire)
--   • ré-activée          → blocks_inventory = true (le EXCLUDE re-garde ;
--     si la chambre a été reprise entre-temps, la ré-activation échoue → correct)
-- ============================================================================

create or replace function sync_blocks_inventory() returns trigger language plpgsql as $$
begin
  if (new.status in ('cancelled','no_show')) is distinct from (old.status in ('cancelled','no_show')) then
    update reservation_room
       set blocks_inventory = new.status not in ('cancelled','no_show')
     where reservation_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists reservation_sync_blocks on reservation;
create trigger reservation_sync_blocks
  after update of status on reservation
  for each row execute function sync_blocks_inventory();
