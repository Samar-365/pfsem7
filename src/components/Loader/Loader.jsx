// ═══════════════════════════════════════════════════════════════
//  LOADER COMPONENT — Pixel-style loading + cinematic intro
// ═══════════════════════════════════════════════════════════════
import { useRef, useEffect, useState } from 'react';
import { animateLoader, playIntroSequence } from '../../animations/intro.js';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // loading → intro → done
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Phase 1: Loading bar
    animateLoader(progressRef, percentRef, () => {
      setPhase('intro');
    });
  }, []);

  useEffect(() => {
    if (phase === 'intro') {
      // Phase 2: Cinematic intro
      setTimeout(() => {
        playIntroSequence(containerRef, () => {
          setPhase('done');
          onComplete();
        });
      }, 300);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  const nameLetters = 'Samar Shetye'.split('');

  return (
    <div className={styles.loader} ref={containerRef}>
      {phase === 'loading' && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingTitle}>
            {'INITIALIZING'.split('').map((ch, i) => (
              <span key={i} className={styles.loadingLetter}>{ch}</span>
            ))}
          </div>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} ref={progressRef} />
          </div>
          <div className={styles.percent} ref={percentRef}>0%</div>
        </div>
      )}

      {phase === 'intro' && (
        <div className={`${styles.introScreen} intro-container`}>
          <div className={`${styles.introName} intro-name`}>
            {nameLetters.map((letter, i) => (
              <span key={i} className={`${styles.introLetter} intro-letter`}>
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
          <div className={`${styles.introSubtitle} intro-subtitle`}>
            Full-Stack & AI Developer
          </div>
        </div>
      )}
    </div>
  );
}
