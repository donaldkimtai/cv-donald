import { useEffect, useMemo, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { fallbackProjects } from '../data/profile'
import { getProjects } from '../lib/queries'
import type { Project } from '../lib/types'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getProjects().then((p) => {
      if (cancelled) return
      setProjects(p)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.tags?.forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [projects])

  const filtered = useMemo(() => {
    if (!activeTag) return projects
    return projects.filter((p) => p.tags?.includes(activeTag))
  }, [activeTag, projects])

  return (
    <div className="container-page py-10 sm:py-14">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        description="A mix of security tooling, full-stack web apps, mobile builds, and educational projects."
      />

      {allTags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              !activeTag
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-bg-card text-fg-muted hover:border-accent/40 hover:text-fg'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border bg-bg-card text-fg-muted hover:border-accent/40 hover:text-fg'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-bg-card p-8 text-center text-fg-muted">
          No projects match this filter yet.
        </p>
      )}
    </div>
  )
}
