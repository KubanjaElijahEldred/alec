import { brands } from '../data'

/* The brand strip appears on both the Services hero and the home hero, so it
   lives here rather than being duplicated.

   The track holds two identical copies of the list. Each copy carries its own
   trailing padding so the gap after the last tile matches the gaps between
   tiles, which means translating the track by exactly -50% lands copy two
   where copy one began and the loop has no seam. The second copy is hidden
   from assistive tech so every name is still announced once, not twice. */
export function BrandStrip({ className = '', label = 'Brands I have worked with' }) {
  return (
    <div className={className}>
      <div className="mb-5 flex items-center gap-4">
        <span className="eyebrow shrink-0">{label}</span>
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
  )
}