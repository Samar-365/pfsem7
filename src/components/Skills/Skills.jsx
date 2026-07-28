// ═══════════════════════════════════════════════════════════════
//  SKILLS SECTION — Animated skill cards with unique entrances
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { animateSkillEntrance, animateProgressBar } from '../../animations/skills.js';
import { SKILLS } from '../../data/portfolioData.js';
import {
  Code, Terminal, Layout, Zap, Server, GitBranch, Sparkles, Database,
} from 'lucide-react';
import styles from './Skills.module.css';

const iconMap = { Code, Terminal, Layout, Zap, Server, GitBranch, Sparkles, Database };

export default function Skills() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const hasAnimated = useRef(false);
  const cardRefs = useRef([]);
  const barRefs = useRef([]);

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

      // Animate each skill card with its unique entrance
      cardRefs.current.forEach((card, i) => {
        if (card) {
          const skill = SKILLS[i];
          animateSkillEntrance(card, skill.entrance, i * 120 + 400);
        }
      });

      // Animate progress bars
      barRefs.current.forEach((bar, i) => {
        if (bar) {
          animateProgressBar(bar, SKILLS[i].confidence, i * 120 + 800);
        }
      });
    }
  }, [isVisible]);

  const titleLetters = 'Skills'.split('');

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {titleLetters.map((ch, i) => (
            <span key={i} className={styles.titleLetter} style={{ opacity: 0 }}>
              {ch}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          {SKILLS.map((skill, i) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <div
                key={skill.id}
                className={`${styles.card} skill-card hoverable`}
                ref={(el) => (cardRefs.current[i] = el)}
                style={{ opacity: 0, '--skill-color': skill.color }}
              >
                {/* Manga Accent Slash Line */}
                <div className={styles.slashLine} />

                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap} style={{ background: `${skill.color}15` }}>
                    <Icon size={22} style={{ color: skill.color }} />
                  </div>
                  <div>
                    <h3 className={styles.skillName}>{skill.name}</h3>
                    <span className={styles.category}>{skill.category}</span>
                  </div>
                  <span className={styles.years}>{skill.yearsExp}</span>
                </div>

                <p className={styles.description}>{skill.description}</p>


              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
