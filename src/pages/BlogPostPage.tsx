import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getPostBySlug } from '../lib/queries'
import { urlFor } from '../lib/sanity'
import type { Post } from '../lib/types'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const portableComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 font-display text-3xl font-bold tracking-tight text-fg">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-fg">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-fg">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-5 text-fg leading-7">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent bg-bg-card p-4 italic text-fg-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-fg marker:text-accent/60">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-fg marker:text-accent/80">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline-offset-2 hover:underline"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-bg-elev px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value)?.width(1200).fit('max').url()
      if (!url) return null
      return (
        <figure className="my-8 overflow-hidden rounded-xl border border-border">
          <img src={url} alt={value?.alt ?? ''} className="w-full" loading="lazy" />
          {value?.alt && (
            <figcaption className="border-t border-border-subtle bg-bg-elev p-3 text-xs text-fg-dim">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-bg-elev p-4 font-mono text-sm text-fg">
        <code>{value?.code}</code>
      </pre>
    ),
  },
}

type State =
  | { status: 'loading' }
  | { status: 'loaded'; post: Post | null }

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    getPostBySlug(slug).then((p) => {
      if (cancelled) return
      setState({ status: 'loaded', post: p })
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  const loading = state.status === 'loading'
  const post = state.status === 'loaded' ? state.post : null

  if (loading) {
    return (
      <div className="container-page py-16 text-center text-fg-muted">Loading post…</div>
    )
  }

  if (!post) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-fg">Post not found</h1>
        <p className="mt-3 text-fg-muted">
          The post you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>
      </div>
    )
  }

  const coverUrl =
    post.coverImageUrl ?? urlFor(post.coverImage)?.width(1600).height(800).url() ?? null

  return (
    <article className="container-page py-10 sm:py-14">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} /> All posts
      </Link>

      <header className="mt-6 max-w-3xl">
        {post.categories && post.categories.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <li
                key={c.slug}
                className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent"
              >
                {c.title}
              </li>
            ))}
          </ul>
        )}
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-fg-muted">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-fg-dim">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} aria-hidden /> {formatDate(post.publishedAt)}
          </span>
          {post.readingMinutes && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden /> {post.readingMinutes} min read
            </span>
          )}
        </div>
      </header>

      {coverUrl && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <img src={coverUrl} alt={post.title} className="w-full" />
        </div>
      )}

      <div className="prose-blog mt-10 max-w-3xl">
        {post.body ? (
          <PortableText value={post.body} components={portableComponents} />
        ) : (
          <p className="text-fg-muted">This post has no body yet.</p>
        )}
      </div>
    </article>
  )
}
