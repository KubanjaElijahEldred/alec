import { ArrowUpRight } from 'lucide-react'

/**
 * Brand card wired to the exact social profile Alec supplied.
 * The avatar is layered over a blurred, scaled copy of itself so that
 * lower-resolution profile pictures still render cleanly.
 */
export function BrandCard({ brand, className = '' }) {
  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group grad-border relative block overflow-hidden bg-card transition-colors ${className}`}
      aria-label={`${brand.name} — open ${brand.category} page`}
    >
      {/* Visual block */}
      <span className="relative block h-56 overflow-hidden bg-alt sm:h-64 lg:h-72">
        {/* Blurred backdrop from the same avatar */}
        <img
          src={brand.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-2xl transition-transform duration-700 group-hover:scale-[1.45]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-card via-card/35 to-transparent" />
        <span className="grid-lines absolute inset-0 opacity-40" />

        {/* Crisp avatar */}
        <img
          src={brand.image}
          alt={`${brand.name} logo`}
          loading="lazy"
          decoding="async"
          className="relative z-10 mx-auto mt-10 h-36 w-36 rounded-full border border-line object-cover shadow-[0_0_0_8px_rgb(var(--c-card)/0.85)] transition-transform duration-500 group-hover:scale-105 sm:h-40 sm:w-40 lg:h-44 lg:w-44"
        />
      </span>

      {/* Body */}
      <span className="block p-5">
        <span className="mb-3 inline-flex w-fit items-center gap-1 border border-brand/50 bg-alt/55 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-brand backdrop-blur">
          View page <ArrowUpRight className="h-3 w-3" />
        </span>

        <span className="block font-display text-xl font-black text-ink transition-colors group-hover:text-brand">
          {brand.name}
        </span>

        <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-azure-soft">
          {brand.category}
        </span>

        <span className="mt-1 block font-mono text-[10px] text-faint">
          {brand.handle}
        </span>

        <span className="mt-3 block text-xs leading-5 text-ink-2">
          {brand.blurb}
        </span>
      </span>
    </a>
  )
}