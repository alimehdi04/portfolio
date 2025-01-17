import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-23', // use current date in YYYY-MM-DD format
  useCdn: false, 
});

export async function POST() {
  try {
    // Revalidate main paths
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/blog');
    revalidatePath('/projects');

    // Revalidate dynamic blog routes
    const slugs = await client.fetch(`*[_type == "blog"].slug.current`);
    for (const slug of slugs) {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return NextResponse.json({ revalidated: false, now: Date.now() }, { status: 500 });
  }
}
