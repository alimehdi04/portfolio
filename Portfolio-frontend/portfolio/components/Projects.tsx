// Import required dependencies
import { client } from '@/sanity'; // Sanity client for fetching data
import { PortableTextBlock } from '@portabletext/types'; // Type for rich text content
import { PortableText } from '@portabletext/react'; // Component to render rich text
import Link from 'next/link';

// Define the Project interface to type-check our data
interface Project {
  _id: string;           // Unique identifier for the project
  title: string;         // Project title
  slug: string;          // slug. It is an URL-friendly version of the title
  description: PortableTextBlock[]; // Rich text content for project description
  image: {              // Project image information
    asset: {
      url: string;     // URL of the uploaded image
    };
  };
  projectLink: string;  // Link to live demo
  githubLink: string;   // Link to GitHub repository
  createdAt: string;    // Project creation date
}

/**
 * Fetches projects from Sanity CMS
 * @returns Promise<Project[]> Array of project objects
 */
export async function getProjects(): Promise<Project[]> {
  // GROQ query to fetch projects
  // _type == "project" filters documents of type "project"
  // order(createdAt desc) sorts by creation date, newest first
  // [0...4] limits to first 4 projects
  const query = `*[_type == "project"] | order(createdAt desc)[0...4]{
    _id,
    title,
    "slug": slug.current,  // Get the current value of the slug
    description,
    image {
      asset->{          // Dereference the asset to get the URL
        url
      }
    },
    projectLink,
    githubLink,
    createdAt
  }`;

  return await client.fetch<Project[]>(query);
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">My Projects</h1>
      {/* Grid layout: 1 column on mobile, 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map through projects array to create project cards */}
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Optional chaining (?.) to safely access nested image properties */}
            {project.image?.asset?.url && (
              <img
                src={project.image.asset.url}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className="text-xl font-semibold mt-4">{project.title}</h2>
            {/* Format the creation date */}
            <p className="text-sm text-gray-500 mt-1">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            {/* Render rich text description with 3-line clamp */}
            <div className="text-gray-700 mt-2 line-clamp-3">
              <PortableText value={project.description} />
            </div>
            {/* Links section with conditional rendering */}
            <div className="flex items-center gap-4 mt-4">
              {project.projectLink && (
                <Link
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Live Demo
                </Link>
              )}
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}