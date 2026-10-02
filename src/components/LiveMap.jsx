import { ExternalLink, Navigation, MapPin } from 'lucide-react'
import { profile } from '../data'

/**
 * Live, interactive, pan/zoom map of Kampala, Uganda.
 * Uses OpenStreetMap's public embed (no API key or account required),
 * with a marker dropped on the city centre.
 */
export function LiveMap() {
  const bbox = '32.5125%2C0.2976%2C32.6525%2C0.3976'
  const marker = '0.3476%2C32.5825'
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`

  return (
    <div className="grad-border reveal overflow-hidden bg-card">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center border border-brand/50 bg-brand/10">
            <MapPin className="h-4 w-4 text-brand" />
          </span>
          <div>
            <p className="eyebrow">Live location</p>
            <h3 className="mt-1 font-display text-2xl font-black text-ink">
              {profile.location}
            </h3>
            <p className="mt-1 text-xs text-muted-2">
              Pan and zoom the map — Kampala city centre is pinned.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={profile.mapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-line bg-alt/40 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-ink-2 transition-colors hover:border-brand hover:text-ink"
          >
            Open in Maps <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={profile.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-on-brand transition-colors hover:bg-brand"
          >
            Directions <Navigation className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="map-frame relative h-[340px] w-full bg-alt sm:h-[420px]">
        <iframe
          title="Live map of Kampala, Uganda"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
          style={{ border: 0 }}
        />

        {/* Corner accent overlay */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line/5" />
      </div>

      {/* Footer note */}
      <div className="flex flex-col gap-2 border-t border-line px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
          Coordinates 0.3476° N, 32.5825° E
        </p>
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-widest text-faint transition-colors hover:text-brand"
        >
          Map data © OpenStreetMap contributors
        </a>
      </div>
    </div>
  )
}