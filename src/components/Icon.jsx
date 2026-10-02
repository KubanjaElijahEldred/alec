import {
  Mail,
  Phone,
  MapPin,
  Clapperboard,
  Repeat,
  PartyPopper,
  Scissors,
  PenTool,
  Sparkles,
} from 'lucide-react'
import {
  WhatsAppIcon,
  TikTokIcon,
  InstagramIcon,
} from './BrandIcons'

const registry = {
  whatsapp: WhatsAppIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  mail: Mail,
  phone: Phone,
  map: MapPin,
  video: Clapperboard,
  content: Sparkles,
  social: Repeat,
  events: PartyPopper,
  edit: Scissors,
  script: PenTool,
}

export function Icon({ name, className = 'h-5 w-5' }) {
  const Cmp = registry[name]
  if (!Cmp) return null
  return <Cmp className={className} />
}