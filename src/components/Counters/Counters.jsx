// ═══════════════════════════════════════════════════════════════
//  COUNTERS COMPONENT — Animated Mechanical Gear Counters
// ═══════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { Settings, Code2, Award, GitBranch } from 'lucide-react';
import styles from './Counters.module.css';

const COUNTER_DATA = [
  { id: 'c1', label: 'Projects & AI Tools', value: 15, suffix: '+', icon: Code2 },
  { id: 'c2', label: 'Years Experience', value: 3, suffix: '+', icon: Settings },
  { id: 'c3', label: 'Hackathon Award', value: 2, prefix: '#', suffix: ' Place', icon: Award },
  { id: 'c4', label: 'Open Source Repos', value: 10, suffix: '+', icon: GitBranch },
];

export default function Counters() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const hasAnimated = useRef(false);
  const numRefs = useRef([]);
  const gearRefs = useRef([]);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Rotate mechanical gears
      gearRefs.current.forEach((gear) => {
        if (gear) {
          anime({
            targets: gear,
            rotate: [0, 360],
            duration: 4000,
            easing: 'easeOutQuart',
          });
        }
      });

      // Count up numerical values using Anime.js morphing
      COUNTER_DATA.forEach((item, i) => {
        const el = numRefs.current[i];
        if (!el) return;

        const counterObj = { val: 0 };
        anime({
          targets: counterObj,
          val: item.value,
          round: 1,
          duration: 2000,
          easing: 'easeOutExpo',
          update: () => {
            el.textContent = `${item.prefix || ''}${counterObj.val}${item.suffix || ''}`;
          },
        });
      });

      // Entrance animation for cards
      anime({
        targets: `.${styles.card}`,
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.9, 1],
        duration: 700,
        delay: anime.stagger(120),
        easing: 'easeOutExpo',
      });
    }
  }, [isVisible]);

  return (
    <section className={styles.countersSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {COUNTER_DATA.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={`${styles.card} hoverable`} style={{ opacity: 0 }}>
                <div className={styles.gearIconWrap} ref={(el) => (gearRefs.current[i] = el)}>
                  <Icon size={24} className={styles.gearIcon} />
                </div>
                <div className={styles.number} ref={(el) => (numRefs.current[i] = el)}>
                  0
                </div>
                <div className={styles.label}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
