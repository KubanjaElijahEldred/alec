import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Repeat,
  PartyPopper,
  Scissors,
  PenTool,
  Sparkles,
} from 'lucide-react'
import { Logo } from './Logo'
import { BrandCard } from './BrandCard'
import { BrandStrip } from './BrandStrip'
import { Sectors } from './Sectors'
import { brands, profile, stats } from '../data'

// One entry per service, matching the six services in data.js.
const serviceStrip = [
  { label: 'Shoot', Glyph: Clapperboard },
  { label: 'Content', Glyph: Sparkles },
  { label: 'Social', Glyph: Repeat },
  { label: 'Events', Glyph: PartyPopper },
  { label: 'Edit', Glyph: Scissors },
  { label: 'Scripts', Glyph: PenTool },
]

export function Profile({ goToPage }) {

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
          <div className="[grid-area:intro] relative flex min-w-0 flex-col border border-line bg-base/80 p-5 backdrop-blur-sm sm:p-8 lg:p-10">
            {/* Headline sits at the very top with nothing above it, and "About"
                follows underneath. The logo shares the headline's line, flush
                right, from lg up: at text-7xl/8xl the headline is far too wide
                to share a flex row, so the mark is pinned to the corner and
                the headline reserves matching padding instead. Below lg it
                stays in flow and wraps under the headline. */}
            <h1 className="font-display text-4xl font-black leading-[0.96] text-ink sm:text-6xl lg:pr-40 lg:text-7xl xl:pr-48 xl:text-8xl">
              Videos that make brands{' '}
              <span className="grad-text">impossible to ignore.</span>
            </h1>

            <Logo className="mt-7 h-16 w-auto self-start sm:h-20 lg:absolute lg:right-10 lg:top-10 lg:mt-0 lg:h-24 xl:h-28" />

            {/* Placed directly under the headline. From lg up the logo is
                absolutely positioned above this point, so the strip reads as the
                next thing in the column rather than sliding under the mark. */}
            <BrandStrip className="mt-9" />

            <p className="eyebrow mt-8 lg:mt-10">About</p>

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
              {serviceStrip.map(({ label, Glyph }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 border border-line bg-alt/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-2"
                >
                  <Glyph className="h-3.5 w-3.5 text-brand" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
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

            {/* Kit strip — sits directly under the two calls to action. */}
            <figure className="mt-10">
              <div className="grad-border overflow-hidden bg-card">
                <img
                  src="/img/tools.webp"
                  alt="Cameras, lenses and audio gear laid out on a dark surface."
                  width="2000"
                  height="700"
                  decoding="async"
                  className="w-full"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="eyebrow">The kit</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                  Standard kit for a shoot like this
                </span>
              </figcaption>
            </figure>
          </div>

          {/* ---- Portrait ---- */}
          <div className="[grid-area:profile] grad-border relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-card sm:aspect-[3/4] lg:aspect-auto lg:min-h-[520px] lg:max-w-none">
            <img
              src={profile.portrait}
              alt={`${profile.name} — ${profile.brand}`}
              className="h-full w-full object-cover object-top"
            />
            {/* Scrim confined to the lower half. Spanning the whole frame put a
                veil over the subject, which read as a blurry photo in light
                mode where `--c-alt` is near-white. */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-alt via-alt/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-line/10 bg-alt/90 p-5 backdrop-blur-none dark:bg-alt/70 dark:backdrop-blur-md">
              <p className="eyebrow">{profile.role}</p>
              <h2 className="mt-2 font-display text-3xl font-black text-ink">
                {profile.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{profile.location}</p>
            </div>
          </div>

          {/* ---- Featured brands ----
              Two cards sit side by side in a single line, and the rest of the
              roster is reached by scrolling the panel top to bottom. The list
              is capped at roughly one row so only those two are visible at
              rest, with the next row peeking to signal there is more. */}
          <div className="[grid-area:brands] mx-auto w-full max-w-[560px] self-end border border-line bg-card p-5 lg:max-w-none">
            <div className="text-center lg:text-left">
              <p className="eyebrow">Brands I have worked with</p>
            </div>
            <div
              data-brand-scroll
              className="mt-5 grid max-h-[856px] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:max-h-[500px] sm:grid-cols-2"
            >
              {brands.map((b) => (
                <BrandCard key={b.id} brand={b} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BY SECTOR ================= */}
      <Sectors goToPage={goToPage} />

      {/* ================= STORIES ================= */}
      <section className="border-b border-line bg-alt px-5 py-16 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">The work behind the pages</p>
              <h2 className="font-display text-3xl font-black text-ink sm:text-5xl">
                What the work <span className="grad-text">actually is.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => goToPage('services')}
              className="inline-flex cursor-pointer items-center gap-2 text-left font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-brand"
            >
              See full services <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Two columns from lg up; the divider only makes sense in a single
              column, so each cell carries its own border instead. */}
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {brands.slice(0, 4).map((b) => (
              <article
                key={b.id}
                className="reveal border-t border-line/10 py-10 first:border-t-0 md:[&:nth-child(-n+2)]:border-t-0 md:[&:nth-child(-n+2)]:pt-0"
              >
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