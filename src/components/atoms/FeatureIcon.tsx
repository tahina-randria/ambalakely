import {
  Bed,
  Shower,
  Moon,
  PencilLine,
  Mountains,
  House,
  Tree,
  WifiHigh,
  Stairs,
  Bell,
  Door,
  CalendarBlank,
  Heart,
  PaintBrush,
  Cookie,
  Coffee,
  Wine,
  Leaf,
  Path,
  Cake,
  Clock,
  ForkKnife,
  Users,
  ArrowsOut,
  Plant,
  Mailbox,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';

/** Phosphor light-weight icon names used across the site. */
export type FeatureIconName =
  | 'bed'
  | 'bath'
  | 'moon'
  | 'desk'
  | 'view'
  | 'house'
  | 'tree'
  | 'wifi'
  | 'stairs'
  | 'bell'
  | 'door'
  | 'calendar'
  | 'heart'
  | 'paint'
  | 'cookie'
  | 'coffee'
  | 'wine'
  | 'leaf'
  | 'path'
  | 'cake'
  | 'clock'
  | 'forkKnife'
  | 'users'
  | 'size'
  | 'plant'
  | 'mail';

const map: Record<FeatureIconName, Icon> = {
  bed: Bed,
  bath: Shower,
  moon: Moon,
  desk: PencilLine,
  view: Mountains,
  house: House,
  tree: Tree,
  wifi: WifiHigh,
  stairs: Stairs,
  bell: Bell,
  door: Door,
  calendar: CalendarBlank,
  heart: Heart,
  paint: PaintBrush,
  cookie: Cookie,
  coffee: Coffee,
  wine: Wine,
  leaf: Leaf,
  path: Path,
  cake: Cake,
  clock: Clock,
  forkKnife: ForkKnife,
  users: Users,
  size: ArrowsOut,
  plant: Plant,
  mail: Mailbox,
};

type Props = {
  name: FeatureIconName;
  size?: number;
  className?: string;
};

/**
 * Phosphor icon at light weight. Used for amenities/features.
 * Always light weight, color inherited from text-muted.
 */
export function FeatureIcon({ name, size = 18, className }: Props) {
  const Cmp = map[name];
  if (!Cmp) return null;
  return <Cmp size={size} weight="light" className={className} aria-hidden />;
}
