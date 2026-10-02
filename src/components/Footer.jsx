import { Logo } from './Logo'
import { profile } from '../data'

export function Footer({ onView }) {
  return (
    <footer className="border-t border-border-card bg-black px-5 py-8">
      <div className="flex w-full flex-col gap-5 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
        <button
          onClick={() => onView('profile')}
          className="flex cursor-pointer items-center gap-4 text-left"
        >
          <Logo className="h-10 w-auto" />
          <span className="font-mono">
            © {new Date().getFullYear()} {profile.name}. {profile.location}.
          </span>
        </button>

        <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest">
          <a
            href={`mailto:${profile.email}`}
            className="grad-underline transition-colors hover:text-brand"
          >
            Email
          </a>
          <a href={`tel:${profile.phone}`} className="grad-underline transition-colors hover:text-brand">
            Call
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="grad-underline transition-colors hover:text-brand"
          >
            Instagram
          </a>
          <a
            href={profile.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="grad-underline transition-colors hover:text-brand"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  )
}