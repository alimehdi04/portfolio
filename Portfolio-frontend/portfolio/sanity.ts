import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-23', // use current date in YYYY-MM-DD format
  useCdn: false, 
  // staleWhileRevalidate: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})