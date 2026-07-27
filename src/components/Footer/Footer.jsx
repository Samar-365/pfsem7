// ═══════════════════════════════════════════════════════════════
//  FOOTER — Animated footer with back-to-top
// ═══════════════════════════════════════════════════════════════
import { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { ArrowUp, Heart, Code2 } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [footerRef, isVisible] = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    if (isVisible) {
      anime({
        targets: `.${styles.content}`,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.content} style={{ opacity: 0 }}>
        <button
          className={`${styles.topButton} hoverable`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>

        <div className={styles.divider} />

        <p className={styles.builtWith}>
          Built with <Code2 size={14} className={styles.codeIcon} /> Anime.js
          & <Heart size={14} className={styles.heartIcon} />
        </p>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Samar Shetye. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
