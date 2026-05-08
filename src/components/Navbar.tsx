import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? 'border-border bg-bg/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-base font-semibold tracking-tight"
          aria-label="Donald Kimtai — home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-bg-elev text-accent transition-colors group-hover:border-accent">
            <Shield size={16} aria-hidden />
          </span>
          <span className="text-fg">
            donald<span className="text-accent">.</span>kimtai
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-accent' : 'text-fg-muted hover:text-fg'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden rounded-md border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20 md:inline-flex"
        >
          Hire me
        </Link>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-md border border-border text-fg md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg-elev md:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-fg-muted hover:bg-bg-card hover:text-fg'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="mt-2 block rounded-md border border-accent/40 bg-accent/10 px-3 py-3 text-center text-base font-medium text-accent"
              >
                Hire me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
