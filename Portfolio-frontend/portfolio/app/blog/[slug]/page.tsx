import { client } from '@/sanity';
import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

// Define the Blog interface
interface Blog {
  _id: string;
  title: string;
  content: PortableTextBlock[]; // Portable Text content
  createdAt: string;
  author: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
}

// Define the Params type (params is a Promise)
interface BlogPostParams {
  params: Promise<{ slug: string }>;
}

// Fetch blog data by slug
async function getBlogData(slug: string): Promise<Blog | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    content,
    createdAt,
    author->{
      name,
      image {
        asset->{
          url
        }
      }
    }
  }`;

  const result = await client.fetch<Blog | null>(query, { slug });
  return result;
}

// BlogPost component with the correct type for props
const BlogPost = async ({ params }: BlogPostParams) => {
  // Wait for params to resolve
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return <div className="mt-10 text-5xl text-center py-10"><strong>Invalid slug</strong></div>;
  }

  const blog = await getBlogData(slug);

  if (!blog) {
    return <div className="mt-10 text-5xl text-center py-10"><strong>Blog not found</strong></div>;
  }

  return (
    <article className="my-6 prose max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(blog.createdAt).toLocaleDateString()} - {blog.author.name}
      </p>

      {blog.author.image && (
        <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-xl p-2 flex items-center gap-4 my-4">
          <Image
            src={blog.author.image.asset.url}
            alt={blog.author.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full"
          />
          <span className="text-gray-800"><strong>{blog.author.name}</strong></span>
        </div>
      )}

      {/* Render Portable Text content */}
      <PortableText value={blog.content || []} />
    </article>
  );
};

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(`*[_type == "blog"].slug.current`);
  return slugs.map(slug => ({ params: { slug } }));
}

export default BlogPost;
