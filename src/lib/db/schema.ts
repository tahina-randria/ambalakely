/**
 * Drizzle schema — typed query layer for the PMS core.
 *
 * Source of truth for the DATABASE is the hand-written SQL in drizzle/*.sql
 * (it carries the bits Drizzle can't express: the GiST EXCLUDE no-overbooking
 * constraint, the generated `occupancy` tstzrange column, updated_at triggers,
 * RLS). This file mirrors those tables so app code gets full type-safety.
 * The derived `occupancy` column is intentionally omitted (DB-generated).
 */
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  char,
  smallint,
  bigint,
  boolean,
  timestamp,
  date,
  time,
  jsonb,
} from 'drizzle-orm/pg-core';

export const reservationStatus = pgEnum('reservation_status', [
  'pending',
  'confirmed',
  'checked_in',
  'checked_out',
  'cancelled',
  'no_show',
]);
export const reservationChannel = pgEnum('reservation_channel', [
  'direct',
  'email',
  'phone',
  'walk_in',
  'ota',
]);
export const stayType = pgEnum('stay_type', ['overnight', 'day_use']);
export const housekeepingStatus = pgEnum('housekeeping_status', [
  'clean',
  'dirty',
  'inspected',
  'out_of_order',
]);

const ts = (name: string) => timestamp(name, { withTimezone: true });
const money = (name: string) => bigint(name, { mode: 'number' }); // minor units

export const property = pgTable('property', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  timezone: text('timezone').notNull().default('Indian/Antananarivo'),
  currency: char('currency', { length: 3 }).notNull().default('MGA'),
  checkInTime: time('check_in_time').notNull().default('13:00'),
  checkOutTime: time('check_out_time').notNull().default('11:00'),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const roomType = pgTable('room_type', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => property.id, { onDelete: 'restrict' }),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  baseOccupancy: smallint('base_occupancy').notNull().default(2),
  maxOccupancy: smallint('max_occupancy').notNull(),
  sizeSqm: smallint('size_sqm'),
  basePriceMinor: money('base_price_minor').notNull(),
  dayUsePriceMinor: money('day_use_price_minor'),
  currency: char('currency', { length: 3 }).notNull().default('MGA'),
  sort: smallint('sort').notNull().default(0),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const room = pgTable('room', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => property.id, { onDelete: 'restrict' }),
  roomTypeId: uuid('room_type_id')
    .notNull()
    .references(() => roomType.id, { onDelete: 'restrict' }),
  code: text('code').notNull(),
  name: text('name'),
  housekeepingStatus: housekeepingStatus('housekeeping_status').notNull().default('clean'),
  isActive: boolean('is_active').notNull().default(true),
  sort: smallint('sort').notNull().default(0),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const ratePlan = pgTable('rate_plan', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => property.id, { onDelete: 'restrict' }),
  code: text('code').notNull(),
  name: text('name').notNull(),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const dailyRate = pgTable('daily_rate', {
  id: uuid('id').primaryKey().defaultRandom(),
  ratePlanId: uuid('rate_plan_id')
    .notNull()
    .references(() => ratePlan.id, { onDelete: 'cascade' }),
  roomTypeId: uuid('room_type_id')
    .notNull()
    .references(() => roomType.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  stayType: stayType('stay_type').notNull().default('overnight'),
  amountMinor: money('amount_minor').notNull(),
  currency: char('currency', { length: 3 }).notNull().default('MGA'),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const guest = pgTable('guest', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => property.id, { onDelete: 'restrict' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  country: char('country', { length: 2 }),
  notes: text('notes'),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const reservation = pgTable('reservation', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id')
    .notNull()
    .references(() => property.id, { onDelete: 'restrict' }),
  reference: text('reference').notNull().unique(),
  guestId: uuid('guest_id')
    .notNull()
    .references(() => guest.id, { onDelete: 'restrict' }),
  status: reservationStatus('status').notNull().default('pending'),
  channel: reservationChannel('channel').notNull().default('direct'),
  checkIn: date('check_in').notNull(),
  checkOut: date('check_out').notNull(),
  adults: smallint('adults').notNull().default(1),
  children: smallint('children').notNull().default(0),
  currency: char('currency', { length: 3 }).notNull().default('MGA'),
  totalMinor: money('total_minor').notNull().default(0),
  notes: text('notes'),
  locale: text('locale'), // langue du visiteur à la réservation (fr/en/no), nullable
  holdExpiresAt: ts('hold_expires_at'),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const reservationRoom = pgTable('reservation_room', {
  id: uuid('id').primaryKey().defaultRandom(),
  reservationId: uuid('reservation_id')
    .notNull()
    .references(() => reservation.id, { onDelete: 'cascade' }),
  roomTypeId: uuid('room_type_id')
    .notNull()
    .references(() => roomType.id, { onDelete: 'restrict' }),
  roomId: uuid('room_id').references(() => room.id, { onDelete: 'restrict' }),
  ratePlanId: uuid('rate_plan_id').references(() => ratePlan.id, { onDelete: 'set null' }),
  stayType: stayType('stay_type').notNull().default('overnight'),
  checkInAt: ts('check_in_at').notNull(),
  checkOutAt: ts('check_out_at').notNull(),
  // `occupancy` (generated tstzrange) lives in the DB only — see file header.
  adults: smallint('adults').notNull().default(1),
  children: smallint('children').notNull().default(0),
  amountMinor: money('amount_minor').notNull().default(0),
  currency: char('currency', { length: 3 }).notNull().default('MGA'),
  blocksInventory: boolean('blocks_inventory').notNull().default(true),
  createdAt: ts('created_at').notNull().defaultNow(),
  updatedAt: ts('updated_at').notNull().defaultNow(),
});

export const reservationEvent = pgTable('reservation_event', {
  id: uuid('id').primaryKey().defaultRandom(),
  reservationId: uuid('reservation_id')
    .notNull()
    .references(() => reservation.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  actor: text('actor'),
  data: jsonb('data').notNull().default({}),
  createdAt: ts('created_at').notNull().defaultNow(),
});
