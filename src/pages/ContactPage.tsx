import { useState, type FormEvent } from 'react'
import { Github, Linkedin, Mail, MapPin, Send, Twitter, BookOpen, Shield } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { fallbackProfile } from '../data/profile'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvgraovk'

const ICONS: Record<string, typeof Github> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  BookOpen,
  Shield,
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('loading')
    setErrorMessage(null)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        form.reset()
        setStatus('success')
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setStatus('error')
        setErrorMessage(data?.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  const profile = fallbackProfile

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let&rsquo;s build something secure"
        description="Available for freelance, consulting, contract work, and remote opportunities — security or full-stack development."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="font-display text-base font-semibold text-fg">Direct</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-fg hover:text-accent"
                >
                  <Mail size={14} className="text-accent" /> {profile.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-fg-muted">
                <MapPin size={14} className="text-accent" /> {profile.location}
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="font-display text-base font-semibold text-fg">Around the web</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {profile.socials.map((s) => {
                const Icon = ICONS[s.icon] ?? Mail
                return (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-accent"
                    >
                      <Icon size={14} className="text-accent" /> {s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="font-display text-base font-semibold text-fg">Currently open to</h3>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li>• Freelance pentests & code reviews</li>
              <li>• Contract security engineering</li>
              <li>• Consulting & advisory</li>
              <li>• Remote opportunities</li>
            </ul>
          </div>
        </aside>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-border bg-bg-card p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-fg">Name</span>
              <input
                name="name"
                required
                placeholder="Your name"
                className="rounded-md border border-border bg-bg-elev px-3 py-2.5 text-sm text-fg placeholder:text-fg-dim focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-fg">Email</span>
              <input
                type="email"
                name="_replyto"
                required
                placeholder="you@company.com"
                className="rounded-md border border-border bg-bg-elev px-3 py-2.5 text-sm text-fg placeholder:text-fg-dim focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </label>
          </div>

          <label className="mt-5 flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Subject</span>
            <input
              name="subject"
              placeholder="What can I help with?"
              className="rounded-md border border-border bg-bg-elev px-3 py-2.5 text-sm text-fg placeholder:text-fg-dim focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <label className="mt-5 flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Message</span>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Tell me about the scope, timeline, and what you'd like to achieve."
              className="rounded-md border border-border bg-bg-elev px-3 py-2.5 text-sm text-fg placeholder:text-fg-dim focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
              <Send size={14} />
            </button>

            {status === 'success' && (
              <p className="text-sm text-accent" role="status">
                Thanks — message sent. I&rsquo;ll reply within 24h.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-danger" role="alert">
                {errorMessage ?? 'Something went wrong. Please try again.'}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
