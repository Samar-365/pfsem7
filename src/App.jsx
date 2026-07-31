// ═══════════════════════════════════════════════════════════════
//  APP — Main application orchestrator
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useCallback } from 'react';
import Loader from './components/Loader/Loader.jsx';
import Cursor from './components/Cursor/Cursor.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Counters from './components/Counters/Counters.jsx';
import About from './components/About/About.jsx';
import Skills from './components/Skills/Skills.jsx';
import Projects from './components/Projects/Projects.jsx';
import Achievements from './components/Achievements/Achievements.jsx';
import Experience from './components/Experience/Experience.jsx';
import Services from './components/Services/Services.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.jsx';
import { useTheme } from './hooks/useTheme.js';
import { initEasterEggs } from './utils/easterEggs.js';
import { animateGridLines } from './animations/background.js';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      const cleanupEasterEggs = initEasterEggs();
      const gridAnim = animateGridLines();

      return () => {
        cleanupEasterEggs();
        if (gridAnim) gridAnim.pause();
      };
    }
  }, [loaded]);

  return (
    <>
      <Cursor />

      {!loaded && <Loader onComplete={handleLoadComplete} />}

      {loaded && (
        <>
          <Navbar />

          <div className="bg-grid" />
          <div className="bg-particles" />
          <div className="theme-flash" />

          <main>
            <Hero />
            <Counters />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Experience />
            <Services />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
