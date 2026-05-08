import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop({ children }: { children: ReactNode }) {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return (
    <div key={pathname} style={{ animation: 'page-fade-in 0.3s ease-out' }}>
      {children}
    </div>
  )
}
