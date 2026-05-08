import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bug, Cloud, Lock, Search, Shield, Terminal } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import PostCard from '../components/PostCard'
import { fallbackProfile } from '../data/profile'
import { getPosts, getProfile, getProjects } from '../lib/queries'
import type { Post, Profile, Project } from '../lib/types'

const SERVICES = [
  {
    icon: Bug,
    title: 'Web App Pentesting',
    body: 'Manual + automated assessments mapped to OWASP Top 10. Clear, prioritized reports with reproducible steps.',
  },
  {
    icon: Lock,
    title: 'API Security Reviews',
    body: 'Authentication, authorization, business-logic flaws, rate limiting, and broken object-level access checks.',
  },
  {
    icon: Cloud,
    title: 'Cloud Hardening',
    body: 'Azure, GitHub, and Linux baselines aligned to ISO 27001 / NIST CSF. Misconfiguration audits and remediation.',
  },
  {
    icon: Search,
    title: 'Bug Bounty & Recon',
    body: 'External recon, attack-surface mapping, and creative chaining for public programs and private scopes.',
  },
  {
    icon: Terminal,
    title: 'Secure Development',
    body: 'Threat modeling, secure code review, and CI gates that catch issues before they ship.',
  },
  {
    icon: Shield,
    title: 'Awareness & Training',
    body: 'Cybersecurity workshops for teams and students — turning fundamentals into habits.',
  },
] as const

export default function HomePage() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile)
  const [projects, setProjects] = useState<Project[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    let cancelled = false
    Promise.all([getProfile(), getProjects(), getPosts()]).then(([p, pr, po]) => {
      if (cancelled) return
      setProfile(p)
      setProjects(pr)
      setPosts(po)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)
  const projectsToShow = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3)
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      <Hero profile={profile} />

      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="What I do"
          title="Practical security, end to end"
          description="From reconnaissance to remediation, I work with teams to find real risk and fix it without slowing them down."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group rounded-xl border border-border bg-bg-card p-6 transition-colors hover:border-accent/40"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <Icon size={18} aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-fg">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-fg-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            description="A small sample of recent security & engineering builds."
          />
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectsToShow.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="From the blog"
            title="Latest writeups & notes"
            description="Bug-bounty notes, OWASP deep-dives, and lessons from the trenches."
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            All posts <ArrowRight size={14} />
          </Link>
        </div>
        {latestPosts.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-xl border border-dashed border-border bg-bg-card p-8 text-center text-fg-muted">
            New posts coming soon — wire up Sanity to publish them here.
          </p>
        )}
      </section>

      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-bg-card to-bg-card p-8 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Got a system you want broken (ethically)?
              </h2>
              <p className="mt-3 text-fg-muted">
                I take on a small number of consulting engagements each quarter — pentests, code
                reviews, and security audits. Let&rsquo;s talk.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
