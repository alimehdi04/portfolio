import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../styles/global.css';
import React from 'react';

export const metadata = {
  title: "Ali Mehdi Naqvi | Building Ideas Through Code",
  description:
    "Explore the creative journey of Ali Mehdi Naqvi, where coding meets artistry. Discover innovative projects, insightful articles, and a showcase of skills that bring ideas to life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Ali Mehdi Naqvi" />
        <title>{metadata.title}</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>

      <body className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
      
    </html>
  );
}
