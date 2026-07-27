// ═══════════════════════════════════════════════════════════════
//  SCROLL ANIMATION UTILITY
//  IntersectionObserver-based scroll trigger for Anime.js
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Creates a scroll-triggered animation using IntersectionObserver.
 * Animation fires once when element enters viewport.
 */
export function createScrollObserver(elements, animationConfig, options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
  } = options;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          ...animationConfig,
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold, rootMargin });

  if (typeof elements === 'string') {
    document.querySelectorAll(elements).forEach((el) => observer.observe(el));
  } else if (elements instanceof Element) {
    observer.observe(elements);
  } else if (elements?.current) {
    observer.observe(elements.current);
  }

  return observer;
}

/**
 * Preset scroll animations
 */
export const scrollPresets = {
  fadeUp: {
    opacity: [0, 1],
    translateY: [60, 0],
    duration: 900,
    easing: 'easeOutExpo',
  },
  fadeIn: {
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad',
  },
  scaleIn: {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 700,
    easing: 'easeOutBack',
  },
  slideLeft: {
    opacity: [0, 1],
    translateX: [-80, 0],
    duration: 800,
    easing: 'easeOutExpo',
  },
  slideRight: {
    opacity: [0, 1],
    translateX: [80, 0],
    duration: 800,
    easing: 'easeOutExpo',
  },
  rotateIn: {
    opacity: [0, 1],
    rotate: [-15, 0],
    scale: [0.9, 1],
    duration: 800,
    easing: 'easeOutBack',
  },
  blurIn: {
    opacity: [0, 1],
    filter: ['blur(10px)', 'blur(0px)'],
    duration: 900,
    easing: 'easeOutQuad',
  },
};

export default createScrollObserver;
