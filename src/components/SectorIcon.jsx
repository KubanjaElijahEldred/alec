import {
  UtensilsCrossed,
  Sparkles,
  Building2,
  PartyPopper,
  HeartPulse,
  Car,
  Clapperboard,
} from 'lucide-react'

const registry = {
  food: UtensilsCrossed,
  wellness: Sparkles,
  hospitality: Building2,
  events: PartyPopper,
  healthcare: HeartPulse,
  motors: Car,
  creative: Clapperboard,
}

export function SectorIcon({ name, className = 'h-5 w-5' }) {
  const Cmp = registry[name]
  if (!Cmp) return null
  return <Cmp className={className} />
}

/** Sector id -> label, for quick lookup. */
export const sectorLabels = {
  'food-drink': 'Food & Drink',
  'wellness-beauty': 'Wellness & Beauty',
  hospitality: 'Hospitality',
  events: 'Events',
  healthcare: 'Healthcare',
  motors: 'Motors',
  creative: 'Creative & Digital',
}