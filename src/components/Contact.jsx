import { ArrowUpRight, Mail, Phone, MapPin, Check } from 'lucide-react'
import { LiveMap } from './LiveMap'
import { profile, socialLinks } from '../data'
import { Icon } from './Icon'

const bullets = [
  'Videography, content creation and social media management',
  'Event coverage and same-week recap edits',
  'TikTok and Instagram management with monthly reviews',
  'Available for on-location shoots across Uganda',
]

/* Matches the Services hero: vertical feather plus a left-hand vanishing
   point, with the two mask layers intersected. */
const heroFade = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), linear-gradient(to right, transparent, black 26%, black 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), linear-gradient(to right, transparent, black 26%, black 100%)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
}

export function Contact() {
  return (
    <div>
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-line px-5 py-16 sm:py-20 lg:px-10">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 rounded-full bg-brand/12 blur-[120px]" />

        <div className="relative w-full">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-0">
            <div className="relative z-10 lg:pr-10">
              <p className="eyebrow mb-4">Contact</p>
              <h1 className="max-w-4xl font-display text-4xl font-black leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
                Let us shoot, edit and{' '}
                <span className="grad-text">post something worth watching.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                I am based in Kampala and take on videography, content creation,
                social media management and event coverage. Reach out on whichever
                channel suits you — I usually reply the same day.
              </p>
            </div>

            {/* Same treatment as the Services hero: bleeds left under the
                headline and fades out along that edge, right edge flush. */}
            <div className="lg:-ml-[12%] lg:w-[calc(100%+12%)]">
              <img
                src="/img/contact-hero.webp"
                alt=""
                width="1700"
                height="1046"
                decoding="async"
                className="w-full"
                style={heroFade}
              />
            </div>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="reveal flex items-start gap-3 border border-line bg-card px-4 py-3.5 text-sm text-ink-2"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Channels */}
      <section className="border-b border-line bg-alt px-5 py-16 lg:px-10">
        <div className="w-full">
          <div className="mb-10">
            <p className="eyebrow mb-3">Direct channels</p>
            <h2 className="font-display text-3xl font-black text-ink sm:text-5xl">
              Pick your <span className="grad-text">channel.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Primary CTA */}
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="grad-border reveal flex flex-col justify-between bg-card p-6 transition-colors hover:bg-card-hover sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between">
                <Icon name="whatsapp" className="h-7 w-7 text-brand" />
                <ArrowUpRight className="h-5 w-5 text-faint transition-colors group-hover:text-brand" />
              </div>
              <div className="mt-10">
                <p className="eyebrow">Fastest reply</p>
                <p className="mt-2 font-display text-2xl font-black text-ink">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm text-muted">{profile.phoneDisplay}</p>
              </div>
            </a>

            {/* Call */}
            <a
              href={`tel:${profile.phone}`}
              className="grad-border reveal flex flex-col justify-between bg-card p-6 transition-colors hover:bg-card-hover"
            >
              <div className="flex items-center justify-between">
                <Phone className="h-6 w-6 text-brand" />
                <ArrowUpRight className="h-5 w-5 text-faint" />
              </div>
              <div className="mt-10">
                <p className="eyebrow">Call</p>
                <p className="mt-2 font-display text-2xl font-black text-ink">
                  {profile.phoneDisplay}
                </p>
                <p className="mt-1 text-sm text-muted">Tap to dial</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(
                'Project inquiry'
              )}`}
              className="grad-border reveal flex flex-col justify-between bg-card p-6 transition-colors hover:bg-card-hover sm:col-span-2"
            >
              <div className="flex items-center justify-between">
                <Mail className="h-6 w-6 text-brand" />
                <ArrowUpRight className="h-5 w-5 text-faint" />
              </div>
              <div className="mt-10">
                <p className="eyebrow">Email</p>
                <p className="mt-2 break-all font-display text-xl font-black text-ink">
                  {profile.email}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Briefs, rates and availability
                </p>
              </div>
            </a>
          </div>

          {/* Socials */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks
              .filter((s) => s.id === 'tiktok' || s.id === 'instagram')
              .map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal flex items-center justify-between border border-line bg-card px-5 py-4 transition-colors hover:border-brand hover:bg-brand/5"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={s.id} className="h-5 w-5 text-brand" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ink-2">
                      {s.label}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-muted-2">
                    {s.id === 'tiktok' ? '@alec.visuals' : '@alecvisuals'}
                  </span>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Live map */}
      <section className="bg-base px-5 py-16 lg:px-10">
        <div className="w-full">
          <div className="mb-10">
            <p className="eyebrow mb-3">Where I am</p>
            <h2 className="font-display text-3xl font-black text-ink sm:text-5xl">
              Find me in <span className="grad-text">Kampala.</span>
            </h2>
          </div>

          <LiveMap />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {/* Every channel on this page is a link, including these three, so
                the card styling never implies a dead control. */}
            <a
              href={profile.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="grad-border block bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <MapPin className="h-5 w-5 text-brand" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-2">
                Base
              </p>
              <p className="mt-1 font-display text-base font-bold text-ink">
                {profile.location}
              </p>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="grad-border block bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <Phone className="h-5 w-5 text-brand" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-2">
                Call or WhatsApp
              </p>
              <p className="mt-1 font-display text-base font-bold text-ink">
                {profile.phoneDisplay}
              </p>
            </a>
            <a
              href={`mailto:${profile.email}?subject=Project%20inquiry`}
              className="grad-border block bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <Mail className="h-5 w-5 text-brand" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-2">
                Email
              </p>
              <p className="mt-1 break-all font-display text-base font-bold text-ink">
                {profile.email}
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}