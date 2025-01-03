'use client';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      href: 'https://github.com/alimehdi04',
      label: 'GitHub'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: 'https://linkedin.com/in/alimehdinaqvi',
      label: 'LinkedIn'
    },
  ];

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* logo & tagline */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors"
            >
              AMN
            </Link>
            <p className="text-gray-400">
              Building digital experiences that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {year} Ali Mehdi Naqvi. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
