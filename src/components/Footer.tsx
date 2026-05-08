import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, BookOpen, Shield } from 'lucide-react'
import { fallbackProfile } from '../data/profile'

const ICONS: Record<string, typeof Github> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
  BookOpen,
  Shield,
}

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = fallbackProfile.socials

  return (
    <footer className="mt-16 border-t border-border bg-bg-elev/40">
      <div className="container-page flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-display text-base font-semibold text-fg">
            donald<span className="text-accent">.</span>kimtai
          </p>
          <p className="text-sm text-fg-muted">
            Security Consultant · Software Developer · Nairobi, Kenya
          </p>
        </div>

        <div className="flex items-center gap-1">
          {socials.map((s) => {
            const Icon = ICONS[s.icon] ?? Mail
            return (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>
      <div className="border-t border-border-subtle">
        <div className="container-page flex flex-col items-start gap-2 py-4 text-xs text-fg-dim md:flex-row md:items-center md:justify-between">
          <p>© {year} Donald Kimtai. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-fg">
              About
            </Link>
            <Link to="/blog" className="hover:text-fg">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-fg">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
