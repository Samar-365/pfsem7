// ═══════════════════════════════════════════════════════════════
//  COMPASS SCROLLBAR — Perfect Half-Circle Section Dots HUD
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './CompassScroll.module.css';

const SECTIONS = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'achievements', name: 'Achievements' },
  { id: 'experience', name: 'Experience' },
  { id: 'services', name: 'Services' },
  { id: 'contact', name: 'Contact' },
];

export default function CompassScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('Hero');
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollRef = useRef(0);

  // Synchronize scroll progress and detect active section
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    const currentY = Math.max(0, window.scrollY);
    const progress = Math.min(1, Math.max(0, currentY / totalHeight));
    setScrollProgress(progress);

    // Precise section detection
    const triggerPosition = currentY + 150;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const sectionEl = document.getElementById(SECTIONS[i].id);
      if (sectionEl) {
        if (triggerPosition >= sectionEl.offsetTop) {
          setActiveSection(SECTIONS[i].name);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Pointer drag scrubbing logic
  const handlePointerDown = (e) => {
    // Let dot click handler process dot clicks cleanly
    if (e.target.closest(`.${styles.dotItem}`)) {
      return;
    }

    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    isDraggingRef.current = true;
    setIsDragging(true);
    startYRef.current = clientY;
    startScrollRef.current = window.scrollY;

    const handlePointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;

      const currentY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaY = currentY - startYRef.current;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      const scrollSensitivity = totalHeight / (window.innerHeight * 0.4);
      const targetY = Math.max(0, Math.min(totalHeight, startScrollRef.current + deltaY * scrollSensitivity));

      window.scrollTo({
        top: targetY,
        behavior: 'auto',
      });
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  };

  // Smooth click navigation to target section
  const handleDotClick = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();

    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) {
      window.scrollTo({
        top: sectionEl.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Perfect Semi-Circle Geometry (Center: 80, 80 | Radius: 64px)
  const radius = 64;
  const cx = 80;
  const cy = 80;
  const percentage = Math.round(scrollProgress * 100);

  return (
    <div
      className={`${styles.compassContainer} ${isDragging ? styles.isDragging : ''}`}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      title="Click dots or drag to scroll"
    >
      {/* Floating Tooltip Badge */}
      <div className={styles.tooltipBadge}>
        <span className={styles.sectionText}>{activeSection}</span>
        <span className={styles.percentText}>{percentage}%</span>
      </div>

      {/* Section Dots along Perfect Half-Circle Arc */}
      <div className={styles.dotsWrapper}>
        {SECTIONS.map((sec, i) => {
          const t = i / (SECTIONS.length - 1);
          const dotX = cx - radius * Math.sin(t * Math.PI);
          const dotY = cy - radius * Math.cos(t * Math.PI);
          const isActive = activeSection.toLowerCase() === sec.name.toLowerCase();

          return (
            <div
              key={sec.id}
              className={`${styles.dotItem} ${isActive ? styles.activeDot : ''}`}
              style={{ left: `${dotX}px`, top: `${dotY}px` }}
              onClick={(e) => handleDotClick(e, sec.id)}
              title={sec.name}
            >
              <div className={styles.dotCore} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
