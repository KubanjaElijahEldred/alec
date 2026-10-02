import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Repeat,
  PartyPopper,
  Scissors,
  PenTool,
} from 'lucide-react'
import { Logo } from './Logo'
import { BrandCard } from './BrandCard'
import { Sectors } from './Sectors'
import { brands, profile, stats } from '../data'

const serviceGlyphs = [Clapperboard, Repeat, PartyPopper, Scissors, PenTool]

export function Profile({ goToPage }) {
  const featured = brands.slice(0, 4)

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-line bg-alt px-5 py-8 sm:py-10 lg:px-10">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-azure/20 to-transparent" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand/10 blur-[110px]" />

        {/* Named areas: portrait first on mobile, then intro, then brands.
            From lg up the intro column spans both rows with the portrait and
            the brands stacked to its right. */}
        <div className="relative grid w-full gap-10 [grid-template-areas:'profile'_'intro'_'brands'] lg:grid-cols-[1fr_460px] lg:[grid-template-areas:'intro_profile'_'intro_brands'] xl:grid-cols-[1fr_520px] lg:items-stretch">
          {/* ---- Intro ---- */}
          <div className="[grid-area:intro] flex flex-col border border-line bg-base/80 p-5 backdrop-blur-sm sm:p-8 lg:p-10">
            <Logo className="mb-6 h-20 w-auto sm:h-28 lg:h-32" />

            <p className="eyebrow mb-5">About</p>

            <h1 className="max-w-5xl font-display text-4xl font-black leading-[0.96] text-ink sm:text-6xl lg:text-7xl xl:text-8xl">
              Creative direction meets{' '}
              <span className="grad-text">real results.</span>
            </h1>

            {/* Stats */}
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4 border-y border-line py-6">
              {stats.map((s) => {
                const hasPlus = s.value.endsWith('+')
                return (
                  <div key={s.label}>
                    <p className="font-display text-4xl font-black text-ink lg:text-5xl">
                      {hasPlus ? s.value.replace('+', '') : s.value}
                      {hasPlus && <span className="text-brand">+</span>}
                    </p>
                    <p className="mt-1 max-w-24 font-mono text-[10px] uppercase tracking-widest text-muted-2">
                      {s.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Bio */}
            <div className="mt-8 grid gap-8 text-base leading-8 text-muted xl:grid-cols-[1fr_0.9fr]">
              <div className="space-y-5">
                <p>
                  I am{' '}
                  <strong className="text-ink">{profile.name}</strong>, a
                  videographer and digital creator based in Kampala. I work at the
                  intersection of videography, content creation and social media
                  management.
                </p>
                <p>
                  My work spans{' '}
                  <strong className="text-ink">12 brands</strong> across food,
                  wellness, healthcare, motors, hospitality and events — shot on
                  location, edited for short-form, and posted with a plan.
                </p>
              </div>
              <p className="border-l border-brand/60 pl-5 text-ink-2">
                My work is simple: make the brand easy to recognise, easy to
                watch and easy to order from — then keep showing up
                consistently.
              </p>
            </div>

            {/* Services strip */}
            <div className="mt-10 flex flex-wrap gap-3">
              {serviceGlyphs.map((Glyph, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 border border-line bg-alt/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-2"
                >
                  <Glyph className="h-3.5 w-3.5 text-brand" />
                  {['Shoot', 'Post', 'Events', 'Edit', 'Scripts'][i]}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => goToPage('services')}
                className="cursor-pointer bg-brand px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-on-brand transition-colors hover:bg-brand"
              >
                View services
              </button>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line bg-alt/40 px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-ink-2 transition-colors hover:border-brand hover:text-ink"
              >
                Start a project
              </a>
            </div>
          </div>

          {/* ---- Portrait ---- */}
          <div className="[grid-area:profile] grad-border relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-card sm:aspect-[3/4] lg:aspect-auto lg:min-h-[520px] lg:max-w-none">
            <img
              src={profile.portrait}
              alt={`${profile.name} — ${profile.brand}`}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-alt via-alt/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-line/10 bg-alt/70 p-5 backdrop-blur">
              <p className="eyebrow">{profile.role}</p>
              <h2 className="mt-2 font-display text-3xl font-black text-ink">
                {profile.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{profile.location}</p>
            </div>
          </div>

          {/* ---- Featured brands ---- */}
          <div className="[grid-area:brands] mx-auto w-full max-w-[560px] border border-line bg-card p-5 lg:max-w-none">
            <div className="text-center lg:text-left">
              <p className="eyebrow">Brands I have worked with</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {featured.map((b) => (
                <BrandCard key={b.id} brand={b} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= KIT ================= */}
      <section className="relative overflow-hidden border-b border-line bg-base px-5 py-12 sm:py-16 lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-azure/10 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">The kit</p>
              <h2 className="font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
                Everything I shoot with,{' '}
                <span className="grad-text">on every job.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              Cinema bodies, a proper shotgun mic and enough light to keep the
              image clean whether we are on a set or on location.
            </p>
          </div>

          <div className="grad-border overflow-hidden bg-card">
            <img
              src="/img/tools.webp"
              alt="Cameras, a tripod, a shotgun microphone, an LED light panel, a drone, a clapperboard and a phone — the videography kit used on Alec Visuals jobs."
              width="2000"
              height="700"
              loading="lazy"
              decoding="async"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= BY SECTOR ================= */}
      <Sectors goToPage={goToPage} />

      {/* ================= STORIES ================= */}
      <section className="border-b border-line bg-alt px-5 py-16 lg:px-10">
        <div className="w-full max-w-4xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">The work behind the pages</p>
              <h2 className="font-display text-3xl font-black text-ink sm:text-5xl">
                What the work <span className="grad-text">actually is.</span>
              </h2>
            </div>
            <button
              onClick={() => goToPage('services')}
              className="inline-flex cursor-pointer items-center gap-2 text-left font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-brand"
            >
              See full services <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y divide-line/10">
            {brands.slice(0, 4).map((b) => (
              <article key={b.id} className="reveal py-12 first:pt-0">
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <h3 className="grad-text-hover font-display text-3xl font-bold text-ink sm:text-4xl">
                    {b.name}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-azure-soft">
                    {b.category}
                  </p>
                  <p className="mt-5 text-base leading-8 text-muted">
                    {b.story}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-brand">
                    Open {b.handle} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}