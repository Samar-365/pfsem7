// ═══════════════════════════════════════════════════════════════
//  PROJECTS ANIMATION — Card expansion, terminal open, parallax
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Animate project card entrance with stagger
 */
export function animateProjectCards(selector = '.project-card') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [80, 0],
    scale: [0.9, 1],
    duration: 800,
    delay: anime.stagger(150, { start: 200 }),
    easing: 'easeOutExpo',
  });
}

/**
 * Project card expand animation (on click)
 */
export function animateCardExpand(element) {
  return anime({
    targets: element,
    scale: [1, 1.02],
    boxShadow: [
      '0 4px 30px rgba(0,0,0,0.3)',
      '0 20px 60px rgba(0,243,255,0.2), 0 0 40px rgba(0,243,255,0.1)',
    ],
    duration: 400,
    easing: 'easeOutBack',
  });
}

/**
 * Project card collapse animation
 */
export function animateCardCollapse(element) {
  return anime({
    targets: element,
    scale: [1.02, 1],
    boxShadow: [
      '0 20px 60px rgba(0,243,255,0.2)',
      '0 4px 30px rgba(0,0,0,0.3)',
    ],
    duration: 300,
    easing: 'easeOutQuad',
  });
}

/**
 * Terminal typing effect for project detail
 */
export function animateTerminalText(selector = '.terminal-line') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 400,
    delay: anime.stagger(80),
    easing: 'easeOutQuad',
  });
}

/**
 * Tech stack tag stagger
 */
export function animateTechTags(selector = '.tech-tag') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    scale: [0.5, 1],
    delay: anime.stagger(60, { start: 300 }),
    duration: 400,
    easing: 'easeOutBack',
  });
}
