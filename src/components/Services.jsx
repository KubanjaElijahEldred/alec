import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { services, contactChannels } from '../data'
import { Icon } from './Icon'
import { BrandStrip } from './BrandStrip'
import { SlideShow } from './SlideShow'

/* Source is a three-frame set of the same look. Every file is portrait, so the
   frame is set taller (9/16) than any of them and object-cover crops sideways
   only — nothing gets trimmed off the top or bottom. */
const pageantShots = [
  {
    src: '/img/miss-7140.webp',
    alt: 'Miss Tourism wearing her crown and sash, photographed at a pageant shoot',
    width: 900,
    height: 1350,
  },
  {
    src: '/img/miss-7141.webp',
    alt: 'Miss Tourism in a second look from the same pageant shoot',
    width: 900,
    height: 1350,
  },
  {
    src: '/img/miss-7146.webp',
    alt: 'Miss Tourism in a third look, photographed in portrait for her campaign feed',
    width: 900,
    height: 1600,
  },
  {
    src: '/img/miss-7145.webp',
    alt: 'Miss Tourism in a fourth look from the same pageant shoot',
    width: 900,
    height: 1600,
  },
]

/* The hero strip is a fixed three-up, so it takes the leading three frames.
   The card and section carousels show all of them. */
const heroShots = pageantShots.slice(0, 3)

/* Second set, unrelated to the first: both landscape and both within 1% of
   9/5, so an aspect-[9/5] band shows them with essentially no crop. */
const sceneShots = [
  {
    src: '/img/loc-9580.webp',
    alt: 'Miss Tourism contestants posing together for a photo scene on set',
    width: 1600,
    height: 886,
  },
  {
    src: '/img/loc-9581.webp',
    alt: 'Miss Tourism contestants holding their poses for a second frame of the photo scene',
    width: 1600,
    height: 892,
  },
]

/* What a project actually looks like, in three beats. Concrete beats keep the
   hero from being another paragraph of adjectives, and they give the reader the
   practical reason to keep going rather than restating what the headline says. */
const process = [
  {
    step: 'Brief',
    detail: 'Audience, message and deliverables agreed before the camera comes out.',
  },
  {
    step: 'Production',
    detail: 'Scripted, shot and directed on location anywhere in Uganda.',
  },
  {
    step: 'Delivery',
    detail: 'Edited cuts, captions and a posting plan you can keep using.',
  },
]

/* Two-axis fade: the top and bottom edges feather away, and the left edge
   dissolves into the headline. mask-composite intersects the two layers —
   the -webkit- keyword is the Safari spelling of the same operation. */
const heroFade = {
  maskImage:
    'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), linear-gradient(to right, transparent, black 26%, black 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), linear-gradient(to right, transparent, black 26%, black 100%)',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
}

export function Services({ goToPage }) {
  return (
    <div>
      {/* Top padding is smaller than the bottom padding: this is the first
          section under the fixed nav, so the eye reads the space above the
          eyebrow as "distance from the navbar". Bottom keeps its generous
          spacing for rhythm; the hero is pulled up under the nav. */}
      <section className="relative overflow-hidden border-b border-line px-5 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14 xl:pb-28 xl:pt-16">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-azure/15 blur-[120px]" />

        <div className="relative w-full">
          {/* items-start rather than items-center: the photo is capped at 880px
              and the text column was 273px shorter at 1440, so centering pushed
              137px of dead space directly under the navbar. The frame strip at
              the foot of this column supplies the missing height instead, so
              there is no hole left behind at the bottom either. */}
          <div className="grid items-start gap-10 xl:grid-cols-[1.05fr_1fr] xl:gap-0">
            <div className="relative z-10 xl:pr-10">
              <p className="eyebrow mb-4">What I do</p>
              {/* text-7xl only from 2xl. In the xl column the headline wrapped to 819px --
                  taller than the photo beside it -- which left the two columns
                  touching with no gap above or below the text. */}
              <h1 className="max-w-5xl font-display text-4xl font-black leading-tight text-ink sm:text-6xl 2xl:text-7xl">
                Services for brands that need{' '}
                <span className="grad-text">clear content.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                I keep the process simple: understand the brand, plan the message,
                shoot the content, post with consistency, and track what is working.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Most brands arrive with a folder of raw footage and no plan for it.
                I turn that into a consistent stream of posts — shot for the brand,
                cut for the platform, and scheduled so the work keeps appearing long
                after the shoot ends.
              </p>

              {/* Three beats rather than more prose: it adds substance to the hero
                  without stacking another wall of text above the fold. */}
              <dl className="mt-9 grid gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-3">
                {process.map(({ step, detail }) => (
                  <div key={step}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-brand">
                      {step}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-muted">{detail}</dd>
                  </div>
                ))}
              </dl>

              {/* The copy alone leaves the column ~270px shorter than the 880px
                  photo beside it, so items-start moved the old void from under
                  the navbar to under this list. Three pageant frames close it:
                  max-w-lg keeps the strip's height from growing with the column
                  on wide screens, which is what makes it land within ~20px of
                  the photo at 1280, 1440 and 1920 alike. A fourth frame would
                  wrap to a second row and roughly double that height, so the
                  strip is pinned to heroShots rather than the full set. */}
              <div className="mt-9 grid max-w-lg grid-cols-3 gap-3">
                {heroShots.map((s) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                ))}
              </div>
            </div>

            {/* The photo bleeds left into the headline and fades out along
                that edge, so it dissolves into the text rather than ending on a
                hard vertical line. Its right edge stays flush with the right
                edge of the card grid below.

                The bleed lives on a wrapper rather than the img itself: as a
                direct grid child the width utility lost the cascade to w-full,
                so lg:w-[112%] never applied and the photo sat 80px short of
                the cards' right edge. With no competing width declaration on
                the wrapper, calc(100% + 12%) resolves against the column and
                the edges line up. */}
            <div className="xl:-ml-[12%] xl:w-[calc(100%+12%)] xl:max-h-[880px] xl:aspect-[3/4]">
              <img
                src="/img/services-hero.webp"
                alt=""
                width="1700"
                height="1046"
                decoding="async"
                className="w-full xl:h-full xl:object-cover"
                style={heroFade}
              />
            </div>
          </div>

          {/* Brands worked with — scrolls right to left. */}
          <BrandStrip className="mt-14" />

          <div className="mt-16">
            <p className="eyebrow mb-3">The work</p>
            <h2 className="max-w-3xl font-display text-3xl font-black leading-tight text-ink sm:text-5xl">
              Start with what your{' '}
              <span className="grad-text">brand needs most.</span>
            </h2>
          </div>

          {/* A real gap with individually bordered cards, rather than a single
              bordered box whose edges butt the six images together. */}
          {/* Same shape as the brand grids: two up from sm, four from xl. */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((s) => {
              const art = `/img/service-${s.id.replace('serv-', '')}.webp`
              return (
                <article
                  key={s.id}
                  className="grad-border reveal group flex flex-col bg-card transition-colors hover:bg-card-hover"
                >
                  <div className="relative overflow-hidden">
                    {/* The content-creation card carries the pageant set itself
                        rather than stock art — it is the closest match between
                        what the card sells and what is actually on the shelf.
                        Sizes land on the same h-60 / h-72 / h-56 the other five
                        cards use, so the row stays level. */}
                    {s.id === 'serv-content' ? (
                      <SlideShow
                        images={pageantShots}
                        label="Miss Tourism content creation"
                        className="h-60 w-full sm:h-72 xl:h-56"
                        frameClass="h-full w-full"
                      />
                    ) : (
                      <img
                        src={art}
                        alt=""
                        width="1200"
                        height="768"
                        loading="lazy"
                        decoding="async"
                        className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-72 xl:h-56"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 text-left xl:p-6">
                    <p className="font-mono text-[11px] font-bold text-azure-soft">
                      {s.number}
                    </p>
                    <h2 className="mt-4 font-display text-2xl font-bold text-ink xl:text-xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted xl:text-[13px] xl:leading-6">
                      {s.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5 xl:mt-4">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-2"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-3 self-start">
                      <p className="inline-block grad-border grad-border-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
                        {s.tag}
                      </p>
                      {/* The cards carry hover states, so they need a real
                          action rather than reading as a dead control. */}
                      <button
                        type="button"
                        onClick={() => goToPage('contact')}
                        className="inline-flex cursor-pointer items-center gap-1.5 border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:border-brand hover:text-ink"
                      >
                        Enquire <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pageant set — one card holding the slideshow, text alongside. */}
      <section className="px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_400px]">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Recent work</p>
            <h2 className="font-display text-3xl font-black leading-tight text-ink sm:text-5xl">
              Four frames from a{' '}
              <span className="grad-text">pageant shoot.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              A title holder's feed cannot run on one hero image. This is one
              look shot four ways — the same set, framed so each frame can
              carry a post on its own.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              Shot, cut and sized for the platform it is going to live on, the
              way every campaign I deliver is finished.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {['Portrait', 'Campaign set', 'Social crop'].map((t) => (
                <p
                  key={t}
                  className="border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-2"
                >
                  {t}
                </p>
              ))}
            </div>
          </div>

          <div className="grad-border bg-card p-3">
            <SlideShow
              images={pageantShots}
              label="Miss Tourism pageant shoot"
              frameClass="aspect-[9/16] w-full"
            />
            <div className="flex items-center justify-between px-1 pb-1 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                Miss Tourism
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-azure-soft">
                {`${String(pageantShots.length).padStart(2, '0')} frames`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo scene — full bleed and landscape, deliberately the opposite of
          the portrait card above: edge to edge, copy laid over the frame
          instead of beside it. The sources are within 1% of 9/5 so the frame
          shows them whole; max-h only bites on wide viewports where the band
          would otherwise outgrow the screen, and object-center keeps that
          crop even rather than trimming heads off the top. */}
      <section className="relative border-t border-line">
        <div className="relative">
          <SlideShow
            images={sceneShots}
            label="Miss Tourism photo scene"
            frameClass="aspect-[9/5] w-full max-h-[92vh]"
            objectPos="center"
            dots="end"
            /* The overlaid copy sits bottom-left, so the side arrows would
               land on top of it below sm where the band is only ~217px tall.
               Dots alone carry the small screens. */
            arrowsClass="hidden sm:block"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/85 via-black/35 to-transparent"
          />

          <div className="pointer-events-none absolute inset-0 flex items-end p-5 sm:p-10 lg:p-14">
            <div className="max-w-xl pb-14 sm:pb-14 lg:pb-16">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/65 sm:text-[10px]">
                On set
              </p>
              <h2 className="mt-3 font-display text-xl font-black leading-tight text-white sm:mt-4 sm:text-3xl lg:text-5xl">
                A photo scene with the whole cast.
              </h2>
              <p className="mt-4 hidden max-w-lg text-sm leading-7 text-white/80 sm:block sm:text-base">
                Miss Tourism contestants holding a pose while the frame is built
                around them. A scene like this is a group problem before it is a
                portrait one — order, light and timing all have to land on the
                same second.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-alt px-5 py-16 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="font-display text-4xl font-black text-ink sm:text-5xl">
              Let us build the{' '}
              <span className="grad-text">next campaign.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Based in Kampala and available for videography, content creation,
              social media management and event coverage. Pick whichever channel
              is easiest — the fastest reply usually comes through WhatsApp.
            </p>

            <button
              type="button"
              onClick={() => goToPage('contact')}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 border border-line bg-card px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-ink-2 transition-colors hover:border-brand hover:text-ink"
            >
              See location & directions <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactChannels.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="grad-border group flex flex-col bg-card p-5 transition-colors hover:bg-card-hover"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Icon name={c.icon} className="h-5 w-5 text-brand" />
                  <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-brand" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                  {c.label}
                </p>
                <p className="mt-2 break-words font-display text-base font-bold text-ink">
                  {c.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}