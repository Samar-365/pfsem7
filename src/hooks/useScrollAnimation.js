// ═══════════════════════════════════════════════════════════════
//  useScrollAnimation — IntersectionObserver hook for Anime.js
// ═══════════════════════════════════════════════════════════════
import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook that returns a ref and isVisible flag.
 * When the element enters the viewport, isVisible becomes true (once).
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export default useScrollAnimation;
