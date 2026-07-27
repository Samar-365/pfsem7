// ═══════════════════════════════════════════════════════════════
//  TIMELINE ANIMATION — Achievement + Experience timeline
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Animate timeline nodes sliding + glowing into place
 */
export function animateTimelineNodes(selector = '.timeline-node') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateX: (el, i) => [i % 2 === 0 ? -100 : 100, 0],
    scale: [0.7, 1],
    duration: 800,
    delay: anime.stagger(200, { start: 200 }),
    easing: 'easeOutExpo',
  });
}

/**
 * Animate timeline connecting line drawing
 */
export function animateTimelineLine(selector = '.timeline-line') {
  return anime({
    targets: selector,
    height: ['0%', '100%'],
    duration: 2000,
    easing: 'easeInOutQuad',
  });
}

/**
 * Glow pulse on timeline dot
 */
export function animateTimelineDotGlow(selector = '.timeline-dot') {
  return anime({
    targets: selector,
    boxShadow: [
      '0 0 5px currentColor',
      '0 0 20px currentColor, 0 0 40px currentColor',
    ],
    scale: [1, 1.3, 1],
    duration: 600,
    delay: anime.stagger(250, { start: 400 }),
    easing: 'easeOutElastic(1, .6)',
  });
}

/**
 * Experience git-commit node animation
 */
export function animateGitNodes(selector = '.git-node') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.8, 1],
    duration: 700,
    delay: anime.stagger(300, { start: 200 }),
    easing: 'easeOutBack',
  });
}

/**
 * Git branch line draw
 */
export function animateGitBranch(selector = '.git-branch-line') {
  return anime({
    targets: selector,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 2000,
    easing: 'easeInOutSine',
  });
}
