import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { services, contactChannels, brands } from '../data'
import { Icon } from './Icon'

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
      <section className="relative overflow-hidden border-b border-line px-5 py-16 sm:py-20 lg:px-10">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-azure/15 blur-[120px]" />

        <div className="relative w-full">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-0">
            <div className="relative z-10 lg:pr-10">
              <p className="eyebrow mb-4">What I do</p>
              <h1 className="max-w-5xl font-display text-4xl font-black leading-tight text-ink sm:text-6xl lg:text-7xl">
                Services for brands that need{' '}
                <span className="grad-text">clear content.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                I keep the process simple: understand the brand, plan the message,
                shoot the content, post with consistency, and track what is working.
              </p>
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
            <div className="lg:-ml-[12%] lg:w-[calc(100%+12%)]">
              <img
                src="/img/services-hero.webp"
                alt=""
                width="1700"
                height="1046"
                decoding="async"
                className="w-full"
                style={heroFade}
              />
            </div>
          </div>

          {/* Brands worked with — scrolls right to left. */}
          <div className="mt-14">
            <div className="mb-5 flex items-center gap-4">
              <span className="eyebrow shrink-0">Brands I have worked with</span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
            <div
              className="overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
              }}
            >
              {/* Two identical copies; the second is hidden from assistive
                  tech so the brand names are announced once, not twice. */}
              <div className="marquee-track flex w-max">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex shrink-0 items-center gap-4 pr-4"
                    aria-hidden={copy === 1 || undefined}
                  >
                    {brands.map((b) => (
                      <img
                        key={b.id}
                        src={b.image}
                        alt={b.name}
                        loading="lazy"
                        decoding="async"
                        className="h-14 w-14 shrink-0 rounded-lg border border-line object-cover"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                    <img
                      src={art}
                      alt=""
                      width="1200"
                      height="768"
                      loading="lazy"
                      decoding="async"
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-72 xl:h-56"
                    />
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