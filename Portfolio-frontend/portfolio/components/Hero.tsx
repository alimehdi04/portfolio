export const revalidate = 60
import { client } from '@/sanity';
import AnimationRoles from './AnimationRoles';
import Link from 'next/link';

// this will get the roles that will run on animations from 'profile' schema
const getRoles = async () => {
  const query = `*[_type == "profile"][0].roles`;
  return await client.fetch<string[]>(query, {}, { next: { revalidate: 60 } });
};

export default async function Hero() {
  const roles = await getRoles();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 sm:px-8">
      {/* Main center box */}
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Ali Mehdi Naqvi
          </span>
        </h1>

        {/* Animations */}
        <div className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300">
          I&apos;m a{' '}
          <span className="font-medium text-cyan-400">
            <AnimationRoles roles={roles} />
          </span>
        </div>

        {/* sub-heading */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          I build exceptional digital experiences that make an impact. Focused on creating elegant solutions to complex problems.
        </p>

        <div className="flex gap-6 justify-center">
          {/* Download CV button */}
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-medium transition-all"
          >
            Download CV
          </a>

          {/* Contact Me button */}
          <Link
            href="/contact"
            className="px-8 py-3 border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 rounded-full font-medium transition-all"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
