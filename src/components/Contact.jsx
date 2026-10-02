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

export function Contact() {
  return (
    <div>
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-border-card px-5 py-16 sm:py-20 lg:px-10">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 rounded-full bg-brand/12 blur-[120px]" />

        <div className="relative w-full">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="max-w-4xl font-display text-4xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Let us shoot, edit and{' '}
            <span className="grad-text">post something worth watching.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
            I am based in Kampala and take on videography, content creation,
            social media management and event coverage. Reach out on whichever
            channel suits you — I usually reply the same day.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="reveal flex items-start gap-3 border border-border-card bg-card-bg px-4 py-3.5 text-sm text-gray-300"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Channels */}
      <section className="border-b border-border-card bg-black px-5 py-16 lg:px-10">
        <div className="w-full">
          <div className="mb-10">
            <p className="eyebrow mb-3">Direct channels</p>
            <h2 className="font-display text-3xl font-black text-white sm:text-5xl">
              Pick your <span className="grad-text">channel.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Primary CTA */}
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="grad-border reveal flex flex-col justify-between bg-card-bg p-6 transition-colors hover:bg-[#0E1626] sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between">
                <Icon name="whatsapp" className="h-7 w-7 text-brand" />
                <ArrowUpRight className="h-5 w-5 text-gray-600 transition-colors group-hover:text-brand" />
              </div>
              <div className="mt-10">
                <p className="eyebrow">Fastest reply</p>
                <p className="mt-2 font-display text-2xl font-black text-white">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm text-gray-400">{profile.phoneDisplay}</p>
              </div>
            </a>

            {/* Call */}
            <a
              href={`tel:${profile.phone}`}
              className="grad-border reveal flex flex-col justify-between bg-card-bg p-6 transition-colors hover:bg-[#0E1626]"
            >
              <div className="flex items-center justify-between">
                <Phone className="h-6 w-6 text-brand" />
                <ArrowUpRight className="h-5 w-5 text-gray-600" />
              </div>
              <div className="mt-10">
                <p className="eyebrow">Call</p>
                <p className="mt-2 font-display text-2xl font-black text-white">
                  {profile.phoneDisplay}
                </p>
                <p className="mt-1 text-sm text-gray-400">Tap to dial</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(
                'Project inquiry'
              )}`}
              className="grad-border reveal flex flex-col justify-between bg-card-bg p-6 transition-colors hover:bg-[#0E1626] sm:col-span-2"
            >
              <div className="flex items-center justify-between">
                <Mail className="h-6 w-6 text-brand" />
                <ArrowUpRight className="h-5 w-5 text-gray-600" />
              </div>
              <div className="mt-10">
                <p className="eyebrow">Email</p>
                <p className="mt-2 break-all font-display text-xl font-black text-white">
                  {profile.email}
                </p>
                <p className="mt-1 text-sm text-gray-400">
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
                  className="reveal flex items-center justify-between border border-border-card bg-card-bg px-5 py-4 transition-colors hover:border-brand hover:bg-brand/5"
                >
                  <span className="flex items-center gap-3">
                    <Icon name={s.id} className="h-5 w-5 text-brand" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-gray-300">
                      {s.label}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">
                    {s.id === 'tiktok' ? '@alec.visuals' : '@alecvisuals'}
                  </span>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Live map */}
      <section className="bg-dark-bg px-5 py-16 lg:px-10">
        <div className="w-full">
          <div className="mb-10">
            <p className="eyebrow mb-3">Where I am</p>
            <h2 className="font-display text-3xl font-black text-white sm:text-5xl">
              Find me in <span className="grad-text">Kampala.</span>
            </h2>
          </div>

          <LiveMap />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border border-border-card bg-card-bg p-5">
              <MapPin className="h-5 w-5 text-brand" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                Base
              </p>
              <p className="mt-1 font-display text-base font-bold text-white">
                {profile.location}
              </p>
            </div>
            <div className="border border-border-card bg-card-bg p-5">
              <Phone className="h-5 w-5 text-brand" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                Call or WhatsApp
              </p>
              <p className="mt-1 font-display text-base font-bold text-white">
                {profile.phoneDisplay}
              </p>
            </div>
            <div className="border border-border-card bg-card-bg p-5">
              <Mail className="h-5 w-5 text-brand" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                Email
              </p>
              <p className="mt-1 break-all font-display text-base font-bold text-white">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}