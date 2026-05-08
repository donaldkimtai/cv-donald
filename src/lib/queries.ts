import { sanity, sanityConfigured } from './sanity'
import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  Post,
  Profile,
  Project,
  Skill,
} from './types'
import {
  fallbackCertifications,
  fallbackEducation,
  fallbackExperience,
  fallbackPosts,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
} from '../data/profile'

const PROFILE_QUERY = /* groq */ `*[_type == "profile"][0]{
  name,
  role,
  tagline,
  location,
  email,
  bio,
  philosophy,
  avatar,
  resumeUrl,
  socials[]{label, url, icon}
}`

const SKILLS_QUERY = /* groq */ `*[_type == "skill"] | order(order asc, category asc){
  _id, category, items, order
}`

const EXPERIENCE_QUERY = /* groq */ `*[_type == "experience"] | order(current desc, startDate desc){
  _id, role, company, location, startDate, endDate, current, bullets
}`

const EDUCATION_QUERY = /* groq */ `*[_type == "education"] | order(startDate desc){
  _id, degree, institution, startDate, endDate, description
}`

const CERTIFICATIONS_QUERY = /* groq */ `*[_type == "certification"] | order(issueDate desc){
  _id, name, issuer, issueDate, url
}`

const PROJECTS_QUERY = /* groq */ `*[_type == "project"] | order(featured desc, date desc){
  _id, title, "slug": slug.current, excerpt, description,
  image, "imageUrl": image.asset->url,
  tags, technologies, liveUrl, repoUrl, featured, date
}`

const PROJECT_BY_SLUG_QUERY = /* groq */ `*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, description,
  image, "imageUrl": image.asset->url,
  tags, technologies, liveUrl, repoUrl, featured, date, body
}`

const POSTS_QUERY = /* groq */ `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, readingMinutes,
  coverImage, "coverImageUrl": coverImage.asset->url,
  categories[]->{_id, title, "slug": slug.current, color},
  tags, featured
}`

const POST_BY_SLUG_QUERY = /* groq */ `*[_type == "post" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, readingMinutes,
  coverImage, "coverImageUrl": coverImage.asset->url,
  categories[]->{_id, title, "slug": slug.current, color},
  tags, body
}`

async function tryFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanity || !sanityConfigured) return null
  try {
    return await sanity.fetch<T>(query, params)
  } catch (err) {
    console.warn('[sanity] fetch failed, using fallback:', err)
    return null
  }
}

export async function getProfile(): Promise<Profile> {
  const data = await tryFetch<Profile>(PROFILE_QUERY)
  return data ?? fallbackProfile
}

export async function getSkills(): Promise<Skill[]> {
  const data = await tryFetch<Skill[]>(SKILLS_QUERY)
  return data && data.length > 0 ? data : fallbackSkills
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  const data = await tryFetch<ExperienceEntry[]>(EXPERIENCE_QUERY)
  return data && data.length > 0 ? data : fallbackExperience
}

export async function getEducation(): Promise<EducationEntry[]> {
  const data = await tryFetch<EducationEntry[]>(EDUCATION_QUERY)
  return data && data.length > 0 ? data : fallbackEducation
}

export async function getCertifications(): Promise<CertificationEntry[]> {
  const data = await tryFetch<CertificationEntry[]>(CERTIFICATIONS_QUERY)
  return data && data.length > 0 ? data : fallbackCertifications
}

export async function getProjects(): Promise<Project[]> {
  const data = await tryFetch<Project[]>(PROJECTS_QUERY)
  return data && data.length > 0 ? data : fallbackProjects
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await tryFetch<Project>(PROJECT_BY_SLUG_QUERY, { slug })
  if (data) return data
  return fallbackProjects.find((p) => p.slug === slug) ?? null
}

export async function getPosts(): Promise<Post[]> {
  const data = await tryFetch<Post[]>(POSTS_QUERY)
  return data && data.length > 0 ? data : fallbackPosts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await tryFetch<Post>(POST_BY_SLUG_QUERY, { slug })
  if (data) return data
  return fallbackPosts.find((p) => p.slug === slug) ?? null
}
