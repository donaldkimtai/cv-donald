import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? 'production'
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? '2024-10-01'

export const sanityConfigured = Boolean(projectId)

export const sanity: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null

const builder = sanity ? imageUrlBuilder(sanity) : null

export function urlFor(source: SanityImageSource | undefined | null) {
  if (!builder || !source) return null
  return builder.image(source)
}
