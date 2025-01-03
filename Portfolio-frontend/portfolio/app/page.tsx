import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
export default async function Home() {
  return (
    <>
      <Hero/>
      <div className="separator h-1 bg-blue-900"></div>
      <Projects/>
    </>
  );
}

