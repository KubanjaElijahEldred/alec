import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BrandCard } from './BrandCard'
import { SectorIcon } from './SectorIcon'
import { brands, sectors } from '../data'

/**
 * Brand index grouped by industry sector, with a filter bar.
 * Selecting a sector narrows the list; "All" shows every sector as its own
 * group so the categorisation is always visible.
 */
export function Sectors({ goToPage }) {
  const [active, setActive] = useState('all')

  const groups = useMemo(
    () =>
      sectors
        .map((s) => ({
          ...s,
          items: brands.filter((b) => b.sector === s.id),
        }))
        .filter((g) => g.items.length && (active === 'all' || active === g.id)),
    [active]
  )

  const countFor = (id) =>
    id === 'all'
      ? brands.length
      : brands.filter((b) => b.sector === id).length

  return (
    <section className="border-b border-line bg-alt px-5 py-16 lg:px-10">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Where I have worked</p>
            <h2 className="font-display text-3xl font-black text-ink sm:text-5xl">
              Brands, <span className="grad-text">by sector.</span>
            </h2>
          </div>
          <button
            onClick={() => goToPage('contact')}
            className="inline-flex cursor-pointer items-center gap-2 text-left font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-brand"
          >
            Work with me <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div
          className="reveal mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter brands by sector"
        >
          <FilterChip
            active={active === 'all'}
            onClick={() => setActive('all')}
            count={countFor('all')}
          >
            All sectors
          </FilterChip>

          {sectors.map((s) => (
            <FilterChip
              key={s.id}
              active={active === s.id}
              onClick={() => setActive(s.id)}
              count={countFor(s.id)}
              icon={<SectorIcon name={s.icon} className="h-3.5 w-3.5" />}
            >
              {s.label}
            </FilterChip>
          ))}
        </div>

        {/* Groups */}
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((g) => (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="mb-12 last:mb-0"
            >
              {/* Sector heading */}
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center self-center border border-brand/50 bg-brand/10">
                  <SectorIcon name={g.icon} className="h-4 w-4 text-brand" />
                </span>
                <h3 className="font-display text-xl font-black text-ink sm:text-2xl">
                  {g.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-2">
                  {g.items.length} {g.items.length === 1 ? 'brand' : 'brands'}
                </span>
                <span className="w-full text-xs text-muted-2 sm:ml-2 sm:w-auto">
                  {g.blurb}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {g.items.map((b) => (
                  <BrandCard key={b.id} brand={b} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

function FilterChip({ active, onClick, count, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex cursor-pointer items-center gap-2 border px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 ${
        active
          ? 'border-brand bg-brand text-on-brand'
          : 'border-line bg-card text-muted hover:border-brand/60 hover:text-ink'
      }`}
    >
      {icon}
      {children}
      <span className={active ? 'text-ink/70' : 'text-faint'}>{count}</span>
    </button>
  )
}