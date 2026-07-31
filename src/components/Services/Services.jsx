// ═══════════════════════════════════════════════════════════════
//  SERVICES — Bento Grid with Interactive Hover & Stagger Animations
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { SERVICES } from '../../data/portfolioData.js';
import { Sparkles, Code2, Globe, Monitor, BarChart3, ChevronRight, Zap } from 'lucide-react';
import styles from './Services.module.css';

const iconMap = { Sparkles, Code2, Globe, Monitor, BarChart3 };

export default function Services() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Title Letter Stagger
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
        translateY: [80, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutExpo',
      });
    }
  }, [isVisible]);

  const titleLetters = 'Services'.split('');

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
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
            Specialized engineering services, AI solutions, & software architecture capabilities.
          </p>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {SERVICES.map((srv) => {
            const Icon = iconMap[srv.icon] || Sparkles;

            return (
              <div
                key={srv.id}
                className={`${styles.bentoCard} ${srv.featured ? styles.featuredCard : ''} hoverable`}
                style={{ opacity: 0, '--service-color': srv.color }}
              >
                {/* Manga Slice Accent Line */}
                <div className={styles.slashLine} />

                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.iconBadge} style={{ backgroundColor: srv.color }}>
                    <Icon size={20} color="#ffffff" />
                  </div>
                  <span className={styles.categoryBadge}>{srv.category}</span>
                </div>

                {/* Card Body */}
                <h3 className={styles.cardTitle}>{srv.title}</h3>
                <span className={styles.subtitleTag}>{srv.subtitle}</span>
                <p className={styles.cardDesc}>{srv.description}</p>

                {/* Tech Tags */}
                <div className={styles.tagList}>
                  {srv.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tagItem}>
                      <ChevronRight size={12} className={styles.tagArrow} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className={styles.cardFooter}>
                  <Zap size={14} className={styles.zapIcon} style={{ color: srv.color }} />
                  <span>Available for Projects</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
