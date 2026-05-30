-- ============================================================================
-- Persiste la langue du visiteur au moment de la réservation (fr/en/no).
-- ----------------------------------------------------------------------------
-- Sert à communiquer avec le client dans SA langue — l'e-mail de confirmation
-- envoyé depuis le desk quand le staff clique « Confirmer ». Nullable : les
-- résas antérieures n'ont pas l'info → le code retombe sur 'fr'. Ajout d'une
-- colonne nullable = DDL en ligne (pas de réécriture de table, pas de verrou
-- bloquant). Idempotent.
-- ============================================================================

alter table reservation add column if not exists locale text;

alter table reservation drop constraint if exists reservation_locale_check;
alter table reservation add constraint reservation_locale_check
  check (locale is null or locale in ('fr', 'en', 'no'));
