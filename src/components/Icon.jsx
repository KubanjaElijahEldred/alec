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
  // socialLinks in data.js calls this one "call"; Contact.jsx calls the same
  // channel "phone". Both resolve so the FAB badge is never left blank.
  call: Phone,
  map: MapPin,
  video: Clapperboard,
  content: Sparkles,
  social: Repeat,
  events: PartyPopper,
  edit: Scissors,
  script: PenTool,
  // Service ids in data.js are plural.
  scripts: PenTool,
}

export function Icon({ name, className = 'h-5 w-5' }) {
  const Cmp = registry[name]
  if (!Cmp) {
    // Silently rendering nothing here is what left the "Call" badge as an
    // empty circle, so make the mismatch loud during development.
    if (import.meta.env?.DEV) {
      console.warn(`<Icon name="${name}" /> has no registry entry.`)
    }
    return null
  }
  return <Cmp className={className} />
}