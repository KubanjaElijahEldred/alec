export const profile = {
  name: 'Alex Kisaakye',
  brand: 'Alec Visuals',
  role: 'Videographer & Digital Creator',
  location: 'Kampala, Uganda',
  email: 'alexkisaakye037@gmail.com',
  phoneDisplay: '0755 184 371',
  phone: '+256755184371',
  whatsapp:
    'https://wa.me/256755184371?text=' +
    encodeURIComponent(
      "Hi Alec, I found your portfolio and I would like to work with you."
    ),
  tiktok: 'https://www.tiktok.com/@alec.visuals',
  instagram: 'https://www.instagram.com/alecvisuals/',
  avatar: '/alec-tiktok-avatar.jpg',
  portrait: '/profile.webp',
  mapsQuery:
    'https://www.google.com/maps/search/?api=1&query=Kampala%2C%20Uganda',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=Kampala%2C+Uganda',
}

export const stats = [
  { value: '12', label: 'Brands served' },
  { value: '4', label: 'Core services' },
  { value: '2', label: 'Platforms managed' },
]

/**
 * Industry sectors the brand work falls into. `icon` maps to a lucide icon
 * registered in components/SectorIcon.jsx.
 */
export const sectors = [
  { id: 'food-drink', label: 'Food & Drink', icon: 'food', blurb: 'Kitchens, bakeries and delivery brands.' },
  { id: 'wellness-beauty', label: 'Wellness & Beauty', icon: 'wellness', blurb: 'Spas, wellness centres and body care.' },
  { id: 'hospitality', label: 'Hospitality', icon: 'hospitality', blurb: 'Venues, dining and guest experience.' },
  { id: 'events', label: 'Events', icon: 'events', blurb: 'Live event coverage and recaps.' },
  { id: 'healthcare', label: 'Healthcare', icon: 'healthcare', blurb: 'Hospitals and patient-facing content.' },
  { id: 'motors', label: 'Motors', icon: 'motors', blurb: 'Vehicle sales and showroom content.' },
  { id: 'creative', label: 'Creative & Digital', icon: 'creative', blurb: 'Studio production and digital work.' },
]

/**
 * Every brand below is linked to the exact social profile supplied by Alec.
 * `image` files in /public/brands were pulled from each profile's own
 * avatar, so every card renders a real, up-to-date brand picture.
 */
export const brands = [
  {
    id: 'koko-digital-studios',
    sector: 'creative',
    name: 'Koko Digital Studios',
    handle: '@koko_digital_studios',
    category: 'Digital studio',
    url: 'https://www.tiktok.com/@koko_digital_studios?_r=1&_t=ZS-9ACSwp6QBk1',
    image: '/brands/koko_digital_studios.jpg',
    blurb:
      'Studio production work — brand video, short-form cuts and camera coverage for client campaigns.',
    story:
      'Studio work means delivering on a deadline, on a brief, and on a look. The output covers brand video, short-form vertical cuts and multi-camera coverage, edited to be ready for every platform in one pass.',
  },
  {
    id: 'oriki-uganda',
    sector: 'wellness-beauty',
    name: 'ORÍKÌ Uganda',
    handle: '@orikispauganda',
    category: 'Spa & wellness',
    url: 'https://www.tiktok.com/@orikispauganda?_r=1&_t=ZS-9ACSzdzIGfp',
    image: '/brands/orikispauganda.jpg',
    blurb:
      'Calm, premium visuals for a wellness brand — spa atmosphere, treatments and product storytelling.',
    story:
      'Wellness content has to feel like an exhale. The direction here is slow, clean and sensory: spa atmosphere, treatment moments and product storytelling that makes a premium experience feel reachable before a client ever books.',
  },
  {
    id: 'le-memorial-wellness',
    sector: 'wellness-beauty',
    name: 'Lè Memorial Wellness Center',
    handle: '@lememorialwellnesscenter',
    category: 'Wellness centre',
    url: 'https://www.tiktok.com/@lememorialwellnesscenter?_r=1&_t=ZS-9ACT2BIkQUP',
    image: '/brands/lememorialwellnesscenter.jpg',
    blurb:
      'Treatment and wellbeing content built to turn a local wellness centre into a booked-out one.',
    story:
      'The goal is trust. Treatment footage, therapist walkthroughs and calm facility tours give people enough confidence to walk in, and enough proof to come back for the next session.',
  },
  {
    id: 'meat-n-bunz',
    sector: 'food-drink',
    name: "Meat'N'Bunz UG",
    handle: '@meatnbunzug',
    category: 'Burgers & street food',
    url: 'https://www.tiktok.com/@meatnbunzug?_r=1&_t=ZS-9ACT5BpmmoQ',
    image: '/brands/meatnbunzug.jpg',
    blurb:
      'Food content that hits the scroll — stacked burgers, close-up sizzle and late-night cravings.',
    story:
      'Food content is won in the first second. Stacked burgers, sizzle close-ups and late-night craving edits are built to stop the scroll and move straight to a comment or an order.',
  },
  {
    id: 'sarahs-cakes',
    sector: 'food-drink',
    name: 'SarahsCakesUg',
    handle: '@sarahscakesug',
    category: 'Bakery & cakes',
    url: 'https://www.tiktok.com/@sarahscakesug?_r=1&_t=ZS-9ACT9eX0iQr',
    image: '/brands/sarahscakesug.jpg',
    blurb:
      'Celebration storytelling — cake reveals, birthdays and the orders people actually send messages about.',
    story:
      'A cake is an occasion, so the content is built like one. Reveals, birthday moments and detail shots turn a product into a memory, which is exactly what makes someone message an order through.',
  },
  {
    id: 'bespoke-cakes-uganda',
    sector: 'food-drink',
    name: 'Bespoke Cakes Uganda',
    handle: '@bespokecakesuganda',
    category: 'Custom cakes',
    url: 'https://www.tiktok.com/@bespokecakesuganda?_r=1&_t=ZS-9ACTCEy1ivV',
    image: '/brands/bespokecakesuganda.jpg',
    blurb:
      'Premium cake storytelling — every design made to feel personal, worth ordering and worth photographing.',
    story:
      'Every cake here is commissioned, which means every video has to feel commissioned too. Design stories, before-and-after builds and celebration edits position the work as an experience rather than a product listing.',
  },
  {
    id: 'pak-fazal-motors',
    sector: 'motors',
    name: 'Pak Fazal Motors',
    handle: '@pak.fazal.motors_ug',
    category: 'Motors & auto sales',
    url: 'https://www.tiktok.com/@pak.fazal.motors_ug?_r=1&_t=ZS-9ACTDrFH3dE',
    image: '/brands/pak_fazal_motors_ug.jpg',
    blurb:
      'Vehicle walkarounds and clean showroom edits that make browsing feel like arriving.',
    story:
      'Car content has one job: make a listing worth a visit. Walkarounds, feature call-outs and clean showroom edits answer the questions buyers ask first — condition, spec and what it feels like to drive.',
  },
  {
    id: 'ooosha-body-care',
    sector: 'wellness-beauty',
    name: 'Ooosha Body Care',
    handle: '@ooosha.body.care',
    category: 'Body care & cosmetics',
    url: 'https://www.tiktok.com/@ooosha.body.care?_r=1&_t=ZS-9ACTN0BrjCn',
    image: '/brands/ooosha_body_care.jpg',
    blurb:
      'Product-led content — routines, textures and results shot so the shelf looks as good as the feed.',
    story:
      'Body care sells on texture and routine. Application edits, close-up product shots and honest routine walkthroughs give customers a clear reason to add it to a basket they were already browsing.',
  },
  {
    id: 'the-tree-house',
    sector: 'hospitality',
    name: 'The Tree House',
    handle: '@thetreehouseentebbe',
    category: 'Venue & hospitality, Entebbe',
    url: 'https://www.tiktok.com/@thetreehouseentebbe?_r=1&_t=ZS-9ACTPDuTsMm',
    image: '/brands/thetreehouseentebbe.jpg',
    blurb:
      'Venue content from Entebbe — atmosphere, weekends and the moments that fill a room.',
    story:
      'Venue content is about atmosphere before it is about the menu. Space, lighting, weekend energy and guest moments are edited to answer one question: is this where I want to be on Saturday night?',
  },
  {
    id: 'drinks-24-ug',
    sector: 'food-drink',
    name: 'Drinks24 UG',
    handle: '@drinks_24_ug',
    category: 'Online drinks delivery',
    url: 'https://www.instagram.com/drinks_24_ug?stkn=bDJyZWc4Mjl2dndw',
    image: '/brands/drinks_24_ug.jpg',
    blurb:
      'Delivery-first content — fast-moving offers and captions written to push customers to order.',
    story:
      'For a delivery brand, every post is a doorway to an order. Product visibility, rotating offers and captions written for the scroll all point the same way: see it, want it, message it in.',
  },
  {
    id: 'ruby-hospital-kampala',
    sector: 'healthcare',
    name: 'Ruby Hospital Kampala',
    handle: '@ruby.hospital.kampala',
    category: 'Healthcare',
    url: 'https://www.tiktok.com/@ruby.hospital.kampala?_r=1&_t=ZS-9ADApbVP7ye',
    image: '/brands/ruby_hospital_kampala.jpg',
    blurb:
      'Healthcare content handled with care — services, facilities and people-first messaging.',
    story:
      'Healthcare content carries real weight, so it is filmed and written to inform rather than entertain. Services, facilities and staff are documented so patients arrive already knowing what to expect.',
  },
  {
    id: 'vibez-nzuri',
    sector: 'events',
    name: 'Vibez Nzuri',
    handle: '@nzurivibez',
    category: 'Events & entertainment',
    url: 'https://www.tiktok.com/@nzurivibez?_r=1&_t=ZS-9ADAxOVrvsL',
    image: '/brands/nzurivibez.jpg',
    blurb:
      'Event coverage — highlights, atmosphere and recap edits that sell the next ticket.',
    story:
      'Event coverage has to work the day after it happens. Highlights, atmosphere and fast recap edits keep the night alive on the feed and quietly sell the next one to everyone who could not be in the room.',
  },
]

export const services = [
  {
    id: 'serv-video',
    number: '01',
    title: 'Videography',
    description:
      'Brand films, product shots, interviews and event coverage shot on location across Kampala and beyond, framed for vertical-first platforms.',
    tag: 'On location',
    features: ['Brand films', 'Product shots', 'Interviews', 'Event coverage'],
  },
  {
    id: 'serv-content',
    number: '02',
    title: 'Content Creation',
    description:
      'End-to-end content for a brand feed — concept, shoot, edit and a posting plan that keeps the page active and consistent.',
    tag: 'Full pipeline',
    features: ['Concepts', 'Shoot days', 'Editing', 'Posting plan'],
  },
  {
    id: 'serv-social',
    number: '03',
    title: 'Social Media Management',
    description:
      'TikTok and Instagram management with content planning, daily posting, community replies and monthly performance reviews.',
    tag: 'Full management',
    features: ['Posting plans', 'Community replies', 'Page cleanup', 'Monthly reports'],
  },
  {
    id: 'serv-events',
    number: '04',
    title: 'Event Coverage',
    description:
      'Multi-camera event coverage for Vibez Nzuri and others — highlights, atmosphere and recap edits published while the buzz is still warm.',
    tag: 'Events',
    features: ['Multi-cam', 'Event recaps', 'Same-week edits', 'Highlight reels'],
  },
  {
    id: 'serv-edit',
    number: '05',
    title: 'Video Editing',
    description:
      'Clean Reels and TikTok-ready cuts, colour polish, captions, sound design and pacing that holds attention to the last frame.',
    tag: 'Post-production',
    features: ['Reels editing', 'Colour polish', 'Captions', 'Sound cleanup'],
  },
  {
    id: 'serv-scripts',
    number: '06',
    title: 'Scripts & Captions',
    description:
      'Scripts, hooks and captions written to be spoken naturally — built around what the brand sells and who it speaks to.',
    tag: 'Voice & narrative',
    features: ['Video scripts', 'Hook lines', 'Captions', 'Brand voice'],
  },
]

export const contactChannels = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: profile.phoneDisplay,
    href: profile.whatsapp,
    icon: 'whatsapp',
    external: true,
  },
  {
    id: 'phone',
    label: 'Call',
    value: profile.phoneDisplay,
    href: `tel:${profile.phone}`,
    icon: 'phone',
    external: false,
  },
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}?subject=${encodeURIComponent(
      'Project inquiry'
    )}`,
    icon: 'mail',
    external: false,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    value: '@alec.visuals',
    href: profile.tiktok,
    icon: 'tiktok',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@alecvisuals',
    href: profile.instagram,
    icon: 'instagram',
    external: true,
  },
  {
    id: 'location',
    label: 'Based in',
    value: profile.location,
    href: profile.mapsQuery,
    icon: 'map',
    external: true,
  },
]

export const socialLinks = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: profile.whatsapp,
    tone: '#25D366',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: profile.tiktok,
    tone: '#FF7A18',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: profile.instagram,
    tone: '#E1306C',
  },
  {
    id: 'mail',
    label: 'Email',
    href: `mailto:${profile.email}`,
    tone: '#2E6BFF',
  },
  {
    id: 'call',
    label: 'Call',
    href: `tel:${profile.phone}`,
    tone: '#6FA0FF',
  },
]