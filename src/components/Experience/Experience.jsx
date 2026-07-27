// ═══════════════════════════════════════════════════════════════
//  EXPERIENCE — Manga Bento Grid with Git Commit Cards
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { EXPERIENCE } from '../../data/portfolioData.js';
import { GitCommit, ChevronRight, Terminal } from 'lucide-react';
import styles from './Experience.module.css';

export default function Experience() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const hasAnimated = useRef(false);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Title
      anime({
        targets: `.${styles.titleLetter}`,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(40),
        easing: 'easeOutExpo',
      });

      // Bento cards entrance
      anime({
        targets: `.${styles.bentoCard}`,
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [40, 0],
        duration: 800,
        delay: anime.stagger(150, { start: 300 }),
        easing: 'easeOutElastic(1, .7)',
      });
    }
  }, [isVisible]);

  // Anime.js 3D Tilt on Mouse Move
  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (-y / rect.height) * 14;
    const rotY = (x / rect.width) * 14;

    anime({
      targets: card,
      rotateX: rotX,
      rotateY: rotY,
      scale: 1.025,
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    anime({
      targets: card,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 600,
      easing: 'easeOutElastic(1, .6)',
    });
  };

  const titleLetters = 'Experience'.split('');

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
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
            Software journey milestones formatted in a Git-Commit Bento Grid layout.
          </p>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {EXPERIENCE.map((exp, i) => {
            const isFeatured = i === 3; // 2026 current year featured panel
            const commitHash = `commit#${exp.year.toLowerCase().replace(/[^a-z0-9]/g, '')}a7f`;

            return (
              <div
                key={exp.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`${styles.bentoCard} ${isFeatured ? styles.featuredCard : ''} hoverable`}
                style={{ opacity: 0 }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                {/* Manga Slice Line */}
                <div className={styles.slashLine} />

                <div className={styles.cardHeader}>
                  <div className={styles.yearBadge}>
                    <GitCommit size={16} />
                    <span>{exp.year}</span>
                  </div>
                  <span className={styles.commitHash}>{commitHash}</span>
                </div>

                <h3 className={styles.commitTitle}>{exp.title}</h3>
                <span className={styles.roleTag}>{exp.role}</span>
                <p className={styles.commitDesc}>{exp.description}</p>

                <ul className={styles.highlights}>
                  {exp.highlights.map((hl, idx) => (
                    <li key={idx} className={styles.highlight}>
                      <ChevronRight size={14} className={styles.arrow} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <Terminal size={14} />
                  <span>git log --stat</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
