// Import required dependencies
import { client } from '@/sanity';  // Sanity client for data fetching
import { PortableTextBlock } from '@portabletext/types';  // Type definition for rich text content
import { PortableText } from '@portabletext/react';  // Component to render rich text
import Image from 'next/image';

// Interface defining the structure of a Project
interface Project {
  _id: string;                // Unique identifier for the project
  title: string;              // Project title
  slug: string;               // URL-friendly version of the title
  description: PortableTextBlock[]; // Rich text description of the project
  image: {                    // Project image information
    asset: {
      url: string;           // URL of the uploaded image
    };
  };
  projectLink: string;        // Link to live demo
  githubLink: string;         // Link to GitHub repository
  createdAt: string;          // Project creation date
}

/**
 * Fetches all projects from Sanity CMS
 * @returns Promise<Project[]> Array of project objects
 */
async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"]{
    _id,
    title,
    "slug": slug.current,    // Get the current value of the slug
    description,
    image {
      asset->{              // Dereference the asset to get the URL
        url
      }
    },
    projectLink,
    githubLink,
    createdAt
  }`;
  return await client.fetch<Project[]>(query);
}

/**
 * Projects component that displays a grid of project cards
 * This is a Server Component (async) that fetches data during render
 */
export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            {project.image?.asset?.url ? (
              <Image
                src={project.image.asset.url}
                alt={project.title}
                width={192}
                height={192}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4">{project.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <div className="text-gray-400 mt-2 line-clamp-3">
              <PortableText value={project.description} />
            </div>
            <div className="flex items-center gap-4 mt-4">
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  aria-label={`Live demo for ${project.title}`}
                >
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
