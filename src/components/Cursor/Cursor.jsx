// ═══════════════════════════════════════════════════════════════
//  CUSTOM CURSOR COMPONENT
// ═══════════════════════════════════════════════════════════════
import { useRef, useEffect } from 'react';
import { initCursor, cursorRipple } from '../../animations/cursor.js';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cleanup = initCursor(cursorRef, dotRef);

    const handleClick = (e) => cursorRipple(e.clientX, e.clientY);
    document.addEventListener('click', handleClick);

    // Expand on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .hoverable, [role="button"]');
    const handleEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add(styles.expanded);
      }
    };
    const handleLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove(styles.expanded);
      }
    };

    // Use MutationObserver to handle dynamically added elements
    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, .hoverable, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    attachHoverListeners();

    const observer = new MutationObserver(() => attachHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      document.removeEventListener('click', handleClick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={dotRef} className={styles.cursorDot} />
    </>
  );
}
