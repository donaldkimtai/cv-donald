import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type SanityImage = SanityImageSource & {
  alt?: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  bio: string[]
  philosophy?: string
  avatar?: SanityImage
  resumeUrl?: string
  socials: SocialLink[]
}

export interface SocialLink {
  label: string
  url: string
  /** lucide-react icon name (e.g. "Github", "Linkedin", "Twitter") */
  icon: string
}

export interface Skill {
  _id?: string
  category: string
  items: string[]
  order?: number
}

export interface ExperienceEntry {
  _id?: string
  role: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current?: boolean
  bullets: string[]
}

export interface EducationEntry {
  _id?: string
  degree: string
  institution: string
  startDate: string
  endDate?: string
  description?: string
}

export interface CertificationEntry {
  _id?: string
  name: string
  issuer: string
  issueDate?: string
  url?: string
}

export interface Project {
  _id?: string
  title: string
  slug: string
  excerpt: string
  description?: string
  image?: SanityImage
  imageUrl?: string
  tags: string[]
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  visibility?: 'public' | 'private'
  featured?: boolean
  date?: string
  body?: PortableTextBlock[]
}

export interface PostCategory {
  _id?: string
  title: string
  slug: string
  color?: string
}

export interface Post {
  _id?: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readingMinutes?: number
  coverImage?: SanityImage
  coverImageUrl?: string
  categories?: PostCategory[]
  body?: PortableTextBlock[]
  tags?: string[]
  featured?: boolean
}
