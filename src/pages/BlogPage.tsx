import { useEffect, useMemo, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import PostCard from '../components/PostCard'
import { fallbackPosts } from '../data/profile'
import { getPosts } from '../lib/queries'
import type { Post } from '../lib/types'

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getPosts().then((p) => {
      if (cancelled) return
      setPosts(p)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    const map = new Map<string, string>()
    posts.forEach((p) =>
      p.categories?.forEach((c) => {
        if (c.slug) map.set(c.slug, c.title)
      }),
    )
    return Array.from(map.entries()).map(([slug, title]) => ({ slug, title }))
  }, [posts])

  const filtered = useMemo(() => {
    if (!activeCategory) return posts
    return posts.filter((p) => p.categories?.some((c) => c.slug === activeCategory))
  }, [activeCategory, posts])

  return (
    <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Notes & writeups"
        title="Blog"
        description="Bug-bounty learnings, OWASP deep-dives, and security engineering notes."
      />

      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              !activeCategory
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-bg-card text-fg-muted hover:border-accent/40 hover:text-fg'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCategory(c.slug)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === c.slug
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-bg-card text-fg-muted hover:border-accent/40 hover:text-fg'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-bg-card p-8 text-center text-fg-muted">
          No posts in this category yet — check back soon.
        </p>
      )}
    </div>
  )
}
