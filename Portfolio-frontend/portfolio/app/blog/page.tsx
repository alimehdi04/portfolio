import { client } from '@/sanity'
import { PortableTextBlock } from '@portabletext/types'
import Link from 'next/link'

// Author interface
interface Author {
  _id: string;
  name: string;
  about: string;
  image: {
    asset: {
      url: string;
    }
  }
}

// Blog interface
interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: PortableTextBlock[];  // Content from Sanity
  createdAt: string;
  author: Author;
}

// Fetching blog data from Sanity
async function getData() {
  const query = `*[_type == "blog"]{
    _id,
    title,
    "slug": slug.current, 
    content,
    createdAt,
    author->{
      _id,
      name,
      about,
      image {
        asset->{
          url
        }
      }
    }
  }`

  return await client.fetch<Blog[]>(query)
}

// this page will show list of all blogs
export default async function Blogs() {
  const blogs = await getData()

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
      {/* blogs card container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          // each blog card
          <div
            key={blog._id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(blog.createdAt).toLocaleDateString()} - {blog.author.name}
            </p>
            <p className="text-gray-700 mt-2 line-clamp-3">
              {blog.content && blog.content[0]?.children[0]?.text || 'No content available'}
            </p>
            <Link
              href={`/blog/${blog.slug}`}
              className="text-blue-500 mt-4 block hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
