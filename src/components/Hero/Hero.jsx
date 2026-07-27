// ═══════════════════════════════════════════════════════════════
//  HERO SECTION — Animejs.com Design with Circular Interactive Gauge
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import {
  animateHeroName,
  animateHeroRole,
  animateHeroSocials,
  animateHeroCTA,
} from '../../animations/hero.js';
import { PERSONAL, SOCIAL_LINKS } from '../../data/portfolioData.js';
import { Download, ArrowRight } from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Mail } from '../Icons.jsx';
import styles from './Hero.module.css';

const iconMap = { Github, Linkedin, Twitter, Instagram, Mail };

export default function Hero() {
  const sectionRef = useRef(null);
  const gaugeRef = useRef(null);
  const arcRef = useRef(null);

  useEffect(() => {
    animateHeroName();
    animateHeroRole();
    animateHeroSocials();
    animateHeroCTA();

    // Circular gauge rotation & pulse animation (animejs.com style)
    if (gaugeRef.current) {
      anime({
        targets: gaugeRef.current,
        rotate: 360,
        duration: 25000,
        loop: true,
        easing: 'linear',
      });
    }

    if (arcRef.current) {
      anime({
        targets: arcRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      });
    }
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={styles.container}>
        {/* Left Column: Headlines & Bullet features */}
        <div className={styles.leftCol}>
          <h1 className={`${styles.mainTitle} hero-name-container`}>
            <span className={`${styles.redTitle} hero-letter`}>Samar Shetye</span>
          </h1>

          <p className={`${styles.subtitle} hero-role`}>
            Full-Stack & AI Software Developer crafting high-performance, interactive web experiences powered by Anime.js.
          </p>

          <div className={`${styles.bulletList} hero-role`}>
            <div className={styles.bulletItem}>
              <ArrowRight size={16} className={styles.arrowIcon} />
              <span>Real-time AI Chrome Extensions & Desktop OCR</span>
            </div>
            <div className={styles.bulletItem}>
              <ArrowRight size={16} className={styles.arrowIcon} />
              <span>High-performance React & Microservice Architecture</span>
            </div>
            <div className={styles.bulletItem}>
              <ArrowRight size={16} className={styles.arrowIcon} />
              <span>Driven by custom Anime.js animations & timelines</span>
            </div>
          </div>

          <div className={`${styles.ctaGroup} hero-cta`}>
            <button onClick={scrollToAbout} className={`${styles.ctaPrimary} hoverable`}>
              Explore Portfolio
            </button>
            <a href={PERSONAL.resumeUrl} className={`${styles.ctaSecondary} hoverable`}>
              <Download size={16} />
              <span>Resume</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className={`${styles.socials} hero-social`}>
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} hoverable`}
                  title={link.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Authentic Animejs.com Circular Dial / Gauge Graphic */}
        <div className={styles.rightCol}>
          <div className={styles.gaugeWrapper}>
            {/* Outer ticks ring */}
            <svg className={styles.gaugeSvg} viewBox="0 0 300 300">
              <circle
                cx="150"
                cy="150"
                r="135"
                fill="none"
                stroke="#2a2928"
                strokeWidth="2"
              />
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="#3a3937"
                strokeWidth="12"
                strokeDasharray="4 8"
                ref={gaugeRef}
              />
              <circle
                cx="150"
                cy="150"
                r="120"
                fill="none"
                stroke="#ff4e4e"
                strokeWidth="8"
                strokeDasharray="180 570"
                strokeLinecap="round"
                ref={arcRef}
              />
            </svg>
            <div className={styles.gaugeCenterBlock}>
              <div className={styles.redBox} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
