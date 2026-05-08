import { Link } from 'react-router-dom'
import { ArrowRight, Download, Mail, MapPin, Terminal } from 'lucide-react'
import type { Profile } from '../lib/types'

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(800px 400px at 20% 10%, rgba(0,255,156,0.10), transparent 60%), radial-gradient(600px 300px at 80% 30%, rgba(245,158,11,0.06), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      <div className="container-page py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for security consulting & freelance
          </div>

          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Hi, I&rsquo;m {profile.name.split(' ')[0]}.
            <br />
            <span className="text-accent">I break things</span> so you don&rsquo;t get breached.
          </h1>

          <p className="max-w-2xl text-lg text-fg-muted sm:text-xl">{profile.tagline}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-accent" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Terminal size={14} className="text-accent" /> {profile.role}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
            >
              Start a project <ArrowRight size={16} />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-elev px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/40 hover:text-accent"
            >
              See my work
            </Link>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-elev px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Download size={16} /> Resume
              </a>
            ) : (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-elev px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Mail size={16} /> Email me
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
