import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-bold tracking-tight text-accent">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-fg-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
      >
        <ArrowLeft size={14} /> Back home
      </Link>
    </div>
  )
}
