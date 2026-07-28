// ═══════════════════════════════════════════════════════════════
//  ACHIEVEMENTS — Manga Panel Bento Grid with 3D Slice & Tilt
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { ACHIEVEMENTS } from '../../data/portfolioData.js';
import { Award, Sparkles, Monitor, Video, Zap } from 'lucide-react';
import styles from './Achievements.module.css';

const iconMap = { Award, Sparkles, Monitor, Video };

export default function Achievements() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Title animation
      anime({
        targets: `.${styles.titleLetter}`,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(40),
        easing: 'easeOutExpo',
      });

      // Bento cards entrance matching Projects style
      anime({
        targets: `.${styles.bentoCard}`,
        opacity: [0, 1],
        translateY: [80, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutExpo',
      });
    }
  }, [isVisible]);

  const titleLetters = 'Achievements'.split('');

  return (
    <section id="achievements" className={styles.achievements} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <h2 className={styles.title}>
            {titleLetters.map((ch, i) => (
              <span key={i} className={styles.titleLetter} style={{ opacity: 0 }}>
                {ch}
              </span>
            ))}
          </h2>
          <p className={styles.subtitle}>
            Key milestones, hackathons, and software achievements in a Manga Bento Layout.
          </p>
        </div>

        {/* Manga Panel Bento Grid */}
        <div className={styles.bentoGrid}>
          {ACHIEVEMENTS.map((ach, i) => {
            const Icon = iconMap[ach.icon] || Award;
            const isFeatured = i === 0;

            return (
              <div
                key={ach.id}
                className={`${styles.bentoCard} ${isFeatured ? styles.featuredCard : ''} hoverable`}
                style={{ opacity: 0 }}
              >
                {/* Manga Accent Slash Line */}
                <div className={styles.slashLine} />

                {/* Panel Header */}
                <div className={styles.panelMeta}>
                  <div className={styles.panelBadge}>
                    <Icon size={18} />
                    <span>{ach.category}</span>
                  </div>
                  <span className={styles.panelDate}>{ach.date}</span>
                </div>

                {/* Panel Content */}
                <h3 className={styles.panelTitle}>{ach.title}</h3>
                <p className={styles.panelSubtitle}>{ach.subtitle}</p>
                <p className={styles.panelDesc}>{ach.description}</p>

                <div className={styles.panelFooter}>
                  <Zap size={14} className={styles.zapIcon} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
