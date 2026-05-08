import { Link } from 'react-router-dom'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import type { Post } from '../lib/types'
import { urlFor } from '../lib/sanity'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function PostCard({ post }: { post: Post }) {
  const imageUrl =
    post.coverImageUrl ?? urlFor(post.coverImage)?.width(800).height(450).url() ?? null

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-colors hover:border-accent/40">
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-elev">
          <img
            src={imageUrl}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-fg-dim">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} aria-hidden /> {formatDate(post.publishedAt)}
          </span>
          {post.readingMinutes && (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden /> {post.readingMinutes} min read
            </span>
          )}
          {post.categories?.slice(0, 1).map((cat) => (
            <span
              key={cat.slug}
              className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
            >
              {cat.title}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-fg group-hover:text-accent">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-fg-muted">{post.excerpt}</p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent"
        >
          Read post <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  )
}
