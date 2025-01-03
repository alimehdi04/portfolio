// Import required dependencies
import { client } from "@/sanity"; // Sanity client for data fetching
import React from "react";

// Type Definitions for Profile Data
interface Experience {
  company: string;    // Company name where experience was gained
  role: string;       // Job title/role at the company
  description: string; // Description of responsibilities and achievements
  startDate: string;  // Start date of the position
  endDate: {         // End date structure with flexibility for current positions
    isPresent: boolean; // Flag to indicate if this is the current position
    date?: string;    // Optional end date if not present position
  };
}

interface Profile {
  name: string;      // Full name of the profile owner
  skills: string[];  // Array of technical skills
  experience: Experience[]; // Array of work experiences
}

/**
 * Fetches profile data from Sanity CMS
 * @returns Promise<Profile> Profile data including name, skills, and experiences
 */
const getProfileData = async (): Promise<Profile> => {
  // GROQ query to fetch first profile document
  // [0] selects the first document as we expect only one profile
  const query = `*[_type == "profile"][0]{
    name,
    skills,
    experience[] {
      company,
      role,
      description,
      startDate,
      endDate {
        isPresent,
        date
      }
    }
  }`;
  return await client.fetch<Profile>(query);
};

const AboutPage = async () => {
  const profile = await getProfileData();

  return (
    // Main container with maximum width and centered content
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
      {/* Container for all sections with consistent spacing */}
      <div className="space-y-6 text-gray-800 text-lg">
        {/* Introduction Section */}
        <section className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Who I Am</h2>
          <p>
            {/* Personal introduction with highlighted text */}
            Hi, my name is <strong>{profile.name}</strong>. I am a passionate{" "}
            <strong className="text-indigo-600">Web Developer</strong> currently pursuing a{" "}
            <strong className="text-indigo-600">B.Tech in Computer Science Engineering</strong> at{" "}
            <strong className="text-indigo-600">Jamia Millia Islamia</strong>, New Delhi. I thrive on coding
            unique solutions and solving problems through engaging, hands-on projects. These projects give me
            practical experience and allow me to push the boundaries of modern web development tools, all
            while refining my skills and staying at the forefront of the field.
          </p>
        </section>

        {/* Skills Section */}
        <section className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Skills</h2>
          <p>My technical toolkit includes:</p>
          {/* Mapping through skills array to create bullet points */}
          <ul className="list-disc ml-6">
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Experience Section */}
        <section className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Experience</h2>
          {/* Mapping through experiences array to display work history */}
          {profile.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-xl text-gray-800">{exp.company}</h3>
              <div className="ml-6">
                <p className="text-sm italic text-gray-600">{exp.role}</p>
                <p className="text-gray-700">{exp.description}</p>
                {/* Conditional rendering for end date based on isPresent flag */}
                <p className="text-sm text-gray-600">
                  <span>From: {new Date(exp.startDate).toLocaleDateString()}</span>
                  {exp.endDate.isPresent ? (
                    <span> - Present</span>
                  ) : (
                    <span> - {new Date(exp.endDate.date).toLocaleDateString()}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Education</h2>
          <p>
            <strong>B.Tech in Computer Science Engineering</strong>
            <br />
            Jamia Millia Islamia, New Delhi (Expected Graduation: 2027)
          </p>
          <p>
            <strong>12th Grade (ISC)</strong>
            <br />
            St. Peter&apos;s School
          </p>
        </section>

        {/* Contact Section with Social Links */}
        <section className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Connect with Me</h2>
          <p>Feel free to reach out or connect with me through these platforms:</p>
          {/* Social links with proper security attributes for external links */}
          <ul className="space-y-2">
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/alimehdi04"
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                alimehdi04
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/alimehdinaqvi/"
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/alimehdinaqvi
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:alimehdinaqvi05@gmail.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                alimehdinaqvi05@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;