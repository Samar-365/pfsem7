// ═══════════════════════════════════════════════════════════════
//  ABOUT SECTION — Manga panel unfold with word reveal
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { PERSONAL } from '../../data/portfolioData.js';
import { User, MapPin, Briefcase, Code2 } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Title letters
      anime({
        targets: `.${styles.titleLetter}`,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(40),
        easing: 'easeOutExpo',
      });

      // Manga panels unfold
      anime({
        targets: `.${styles.panel}`,
        opacity: [0, 1],
        translateY: [60, 0],
        rotateX: [15, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutExpo',
      });

      // Bio words
      anime({
        targets: `.${styles.bioWord}`,
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        delay: anime.stagger(20, { start: 800 }),
        easing: 'easeOutQuad',
      });

      // Profile image
      anime({
        targets: `.${styles.profileImage}`,
        opacity: [0, 1],
        scale: [0.7, 1],
        rotate: [-10, 0],
        duration: 900,
        delay: 600,
        easing: 'easeOutElastic(1, .6)',
      });
    }
  }, [isVisible]);

  const titleLetters = 'About Me'.split('');
  const bioWords = PERSONAL.bio.split(' ');

  const infoPanels = [
    { icon: User, label: 'Name', value: PERSONAL.name },
    { icon: MapPin, label: 'Location', value: PERSONAL.location },
    { icon: Briefcase, label: 'Role', value: 'Full-Stack Developer' },
    { icon: Code2, label: 'Focus', value: 'AI & Web Development' },
  ];

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {titleLetters.map((ch, i) => (
            <span key={i} className={styles.titleLetter} style={{ opacity: 0 }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          {/* Profile Image */}
          <div className={styles.profileSection}>
            <div className={`${styles.profileImage}`} style={{ opacity: 0 }}>
              <div className={styles.diagonalLines} />
              <img
                src="/profile.png"
                alt="Samar Shetye"
                className={styles.profilePhoto}
              />
            </div>
          </div>

          {/* Bio + Info Panels */}
          <div className={styles.infoSection}>
            <div className={styles.bio}>
              {bioWords.map((word, i) => (
                <span key={i} className={styles.bioWord} style={{ opacity: 0 }}>
                  {word}{' '}
                </span>
              ))}
            </div>

            <div className={styles.panels}>
              {infoPanels.map((panel, i) => (
                <div key={i} className={`${styles.panel} hoverable`} style={{ opacity: 0 }}>
                  {/* Manga Accent Slash Line */}
                  <div className={styles.slashLine} />
                  <panel.icon size={20} className={styles.panelIcon} />
                  <div>
                    <span className={styles.panelLabel}>{panel.label}</span>
                    <span className={styles.panelValue}>{panel.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
