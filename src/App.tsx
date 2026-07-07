import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { About } from "./features/about/About";
import { Contact } from "./features/contact/Contact";
import { Experience } from "./features/experiences/Experience";
import { Hero } from "./features/hero/Hero";
import { Skills } from "./features/hero/Skills";
import { ProjectList } from "./features/projects/ProjectList";
import { BackToTop } from "./components/BackToTop";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-slate-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <NavBar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ProjectList />
        <Experience />
        <Contact />

        <BackToTop />
      </main>
      <Footer />
    </div>
  );
}

export default App;
