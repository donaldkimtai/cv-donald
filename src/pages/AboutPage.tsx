import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Briefcase, GraduationCap, Mail, MapPin, Quote } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import {
  fallbackCertifications,
  fallbackEducation,
  fallbackExperience,
  fallbackProfile,
  fallbackSkills,
} from '../data/profile'
import {
  getCertifications,
  getEducation,
  getExperience,
  getProfile,
  getSkills,
} from '../lib/queries'
import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  Profile,
  Skill,
} from '../lib/types'

function formatPeriod(start: string, end?: string, current?: boolean) {
  const fmt = (s: string) => {
    const [year, month] = s.split('-')
    if (!month) return year
    const d = new Date(Number(year), Number(month) - 1)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return `${fmt(start)} — ${current ? 'Present' : end ? fmt(end) : 'Present'}`
}

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile)
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills)
  const [experience, setExperience] = useState<ExperienceEntry[]>(fallbackExperience)
  const [education, setEducation] = useState<EducationEntry[]>(fallbackEducation)
  const [certs, setCerts] = useState<CertificationEntry[]>(fallbackCertifications)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      getProfile(),
      getSkills(),
      getExperience(),
      getEducation(),
      getCertifications(),
    ]).then(([p, s, ex, ed, c]) => {
      if (cancelled) return
      setProfile(p)
      setSkills(s)
      setExperience(ex)
      setEducation(ed)
      setCerts(c)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="container-page py-16 sm:py-24">
      <header className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-accent">About me</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {profile.name}
        </h1>
        <p className="text-lg text-fg-muted sm:text-xl">{profile.role}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-accent" /> {profile.location}
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 hover:text-accent"
          >
            <Mail size={14} className="text-accent" /> {profile.email}
          </a>
        </div>
      </header>

      <section className="mt-12 max-w-3xl space-y-4 text-base leading-relaxed text-fg sm:text-lg">
        {profile.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      {profile.philosophy && (
        <figure className="mt-10 max-w-3xl rounded-xl border-l-2 border-accent bg-bg-card p-6">
          <Quote size={18} className="text-accent" aria-hidden />
          <blockquote className="mt-2 font-display text-xl italic tracking-tight text-fg">
            {profile.philosophy}
          </blockquote>
        </figure>
      )}

      <section className="mt-20">
        <SectionHeading
          eyebrow="Tools & tech"
          title="Skills"
          description="Stacks, tools, and frameworks I use day-to-day."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <article
              key={skill.category + (skill._id ?? '')}
              className="rounded-xl border border-border bg-bg-card p-5"
            >
              <h3 className="font-display text-base font-semibold tracking-tight text-fg">
                {skill.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border-subtle bg-bg-elev px-2.5 py-1 text-xs font-medium text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Career"
          title="Work experience"
          description="Recent roles and what I shipped while I was there."
        />
        <ol className="relative mt-8 space-y-8 border-l border-border pl-6">
          {experience.map((entry) => (
            <li key={(entry._id ?? '') + entry.company} className="relative">
              <span className="absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-bg-elev text-accent">
                <Briefcase size={12} aria-hidden />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                  {entry.role} <span className="text-fg-muted">· {entry.company}</span>
                </h3>
                <span className="font-mono text-xs text-fg-dim">
                  {formatPeriod(entry.startDate, entry.endDate, entry.current)}
                </span>
              </div>
              {entry.location && (
                <p className="mt-0.5 text-sm text-fg-dim">{entry.location}</p>
              )}
              {entry.bullets.length > 0 && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-fg-muted marker:text-accent/60">
                  {entry.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow="Academic" title="Education" />
        <ol className="relative mt-8 space-y-8 border-l border-border pl-6">
          {education.map((entry) => (
            <li key={(entry._id ?? '') + entry.institution} className="relative">
              <span className="absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full border border-border bg-bg-elev text-accent">
                <GraduationCap size={12} aria-hidden />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                  {entry.degree}
                </h3>
                <span className="font-mono text-xs text-fg-dim">
                  {formatPeriod(entry.startDate, entry.endDate)}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-fg-muted">{entry.institution}</p>
              {entry.description && (
                <p className="mt-2 text-sm text-fg-muted">{entry.description}</p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Industry credentials I've earned."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {certs.map((cert) => {
            const inner = (
              <article className="flex items-start gap-3 rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-accent/40">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                  <Award size={16} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-fg">
                    {cert.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-fg-muted">
                    {cert.issuer}
                    {cert.issueDate ? ` · ${cert.issueDate}` : ''}
                  </p>
                </div>
              </article>
            )
            return (
              <li key={(cert._id ?? '') + cert.name}>
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-20 rounded-2xl border border-border bg-bg-card p-8 sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">
              Want to work together?
            </h2>
            <p className="mt-2 text-fg-muted">
              I'm available for freelance, consulting, contract work, and remote opportunities.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Contact me <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
