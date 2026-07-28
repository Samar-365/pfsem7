// ═══════════════════════════════════════════════════════════════
//  NAVBAR — Glassmorphic navigation with scroll reactions
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { NAV_ITEMS } from '../../data/portfolioData.js';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Navbar entrance
    anime({
      targets: navRef.current,
      translateY: [-80, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 200,
      easing: 'easeOutExpo',
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.section));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i]) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(NAV_ITEMS[i].section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      style={{ opacity: 0 }}
    >
      <div className={styles.navInner}>
        <button className={`${styles.logo} nav-logo hoverable`} onClick={() => scrollTo('hero')}>
          <span className={styles.logoAccent}>S</span>amar
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.navLink} hoverable ${activeSection === item.section ? styles.active : ''}`}
              onClick={() => scrollTo(item.section)}
            >
              {item.label}
              {activeSection === item.section && <span className={styles.activeBar} />}
            </button>
          ))}
        </div>

        <button
          className={`${styles.hamburger} hoverable ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Section indicator dots (right edge) */}
      <div className={styles.sectionDots}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.sectionDot} ${activeSection === item.section ? styles.dotActive : ''}`}
            onClick={() => scrollTo(item.section)}
            aria-label={item.label}
          />
        ))}
      </div>
    </nav>
  );
}
