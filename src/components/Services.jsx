import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { services, contactChannels } from '../data'
import { Icon } from './Icon'

export function Services({ goToPage }) {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border-card px-5 py-16 sm:py-20 lg:px-10">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-azure/15 blur-[120px]" />

        <div className="relative w-full">
          <p className="eyebrow mb-4">What I do</p>
          <h1 className="max-w-5xl font-display text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Services for brands that need{' '}
            <span className="grad-text">clear content.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
            I keep the process simple: understand the brand, plan the message,
            shoot the content, post with consistency, and track what is working.
          </p>

          <div className="mt-12 grid border border-border-card bg-border-card md:grid-cols-2 xl:grid-cols-6">
            {services.map((s, i) => {
              const glyph = ['video', 'content', 'social', 'events', 'edit', 'script'][i % 6]
              return (
                <article
                  key={s.id}
                  className="reveal bg-card-bg p-6 text-left transition-colors hover:bg-[#0E1626]"
                >
                  <Icon name={glyph} className="h-6 w-6 text-brand" />
                  <p className="mt-6 font-mono text-[11px] font-bold text-azure-soft">
                    {s.number}
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-bold text-white">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    {s.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="border border-border-card px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-gray-500"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 inline-block grad-border grad-border-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
                    {s.tag}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-black px-5 py-16 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
              Let us build the{' '}
              <span className="grad-text">next campaign.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-400">
              Based in Kampala and available for videography, content creation,
              social media management and event coverage. Pick whichever channel
              is easiest — the fastest reply usually comes through WhatsApp.
            </p>

            <button
              onClick={() => goToPage('contact')}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 border border-border-card bg-card-bg px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-gray-200 transition-colors hover:border-brand hover:text-white"
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
                className="grad-border group flex flex-col bg-card-bg p-5 transition-colors hover:bg-[#0E1626]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <Icon name={c.icon} className="h-5 w-5 text-brand" />
                  <ArrowUpRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-brand" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  {c.label}
                </p>
                <p className="mt-2 break-words font-display text-base font-bold text-white">
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