import type { ReactNode } from 'react'

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-6 bg-accent/60" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-fg-muted sm:text-lg">{description}</p>
      )}
    </div>
  )
}
