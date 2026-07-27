// ═══════════════════════════════════════════════════════════════
//  SKILLS ANIMATION — Per-skill unique entrance effects
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Map of unique entrance animations per skill type
 */
const entranceAnimations = {
  slide: {
    translateX: [-120, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo',
  },
  rotate: {
    rotate: [-180, 0],
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 900,
    easing: 'easeOutBack',
  },
  fall: {
    translateY: [-200, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutBounce',
  },
  bounce: {
    translateY: [100, 0],
    opacity: [0, 1],
    scale: [0.3, 1],
    duration: 800,
    easing: 'easeOutElastic(1, .5)',
  },
  fly: {
    translateX: [200, 0],
    translateY: [-100, 0],
    opacity: [0, 1],
    rotate: [45, 0],
    duration: 900,
    easing: 'easeOutExpo',
  },
  explode: {
    scale: [3, 1],
    opacity: [0, 1],
    filter: ['blur(20px)', 'blur(0px)'],
    duration: 700,
    easing: 'easeOutExpo',
  },
  glitch: {
    opacity: [0, 1],
    translateX: [
      { value: -10, duration: 50 },
      { value: 10, duration: 50 },
      { value: -5, duration: 50 },
      { value: 5, duration: 50 },
      { value: 0, duration: 300 },
    ],
    easing: 'easeOutQuad',
  },
};

/**
 * Animate a skill card with its assigned entrance type
 */
export function animateSkillEntrance(element, entranceType, delay = 0) {
  const config = entranceAnimations[entranceType] || entranceAnimations.slide;

  return anime({
    targets: element,
    ...config,
    delay,
  });
}

/**
 * Animate progress bar fill
 */
export function animateProgressBar(element, targetWidth, delay = 0) {
  return anime({
    targets: element,
    width: [`0%`, `${targetWidth}%`],
    duration: 1200,
    delay,
    easing: 'easeInOutExpo',
  });
}

/**
 * Stagger animation for skill section title
 */
export function animateSkillSectionTitle(selector = '.skills-title-letter') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    delay: anime.stagger(40),
    easing: 'easeOutExpo',
  });
}
