import { ArrowUpRight, Github, Lock, Unlock } from 'lucide-react'
import type { Project } from '../lib/types'
import { urlFor } from '../lib/sanity'

export default function ProjectCard({ project }: { project: Project }) {
  const imageUrl =
    project.imageUrl ?? urlFor(project.image)?.width(800).height(450).url() ?? null

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-colors hover:border-accent/40">
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-elev">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-elev to-bg-card text-fg-dim">
            <span className="font-mono text-sm">{project.tags?.[0] ?? 'project'}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {project.featured && (
            <span className="rounded-full border border-accent/40 bg-bg/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur">
              Featured
            </span>
          )}
          {project.visibility && (
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${
                project.visibility === 'public'
                  ? 'border-accent/40 bg-accent-soft text-accent'
                  : 'border-amber/40 bg-bg/85 text-amber'
              }`}
              aria-label={`${project.visibility} project`}
            >
              {project.visibility === 'public' ? (
                <Unlock size={10} aria-hidden />
              ) : (
                <Lock size={10} aria-hidden />
              )}
              {project.visibility}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-semibold tracking-tight text-fg group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-sm text-fg-muted">{project.excerpt}</p>

        {project.tags && project.tags.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border-subtle bg-bg-elev px-2 py-0.5 text-[11px] font-medium text-fg-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center gap-3 pt-2 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              View <ArrowUpRight size={14} />
            </a>
          )}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-fg-muted hover:text-fg"
              aria-label="Source code"
            >
              <Github size={14} /> Code
            </a>
          ) : project.visibility === 'private' ? (
            <span
              className="inline-flex items-center gap-1 text-fg-dim"
              title="Source code is private"
            >
              <Lock size={12} /> Private repo
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
