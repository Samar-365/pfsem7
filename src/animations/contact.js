// ═══════════════════════════════════════════════════════════════
//  CONTACT ANIMATION — Self-drawing form + submit sequence
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Form fields draw-themselves border animation
 */
export function animateFormFields(selector = '.contact-field') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [30, 0],
    borderColor: ['transparent', 'var(--accent)'],
    duration: 700,
    delay: anime.stagger(150, { start: 200 }),
    easing: 'easeOutExpo',
  });
}

/**
 * Submit button morph hover
 */
export function animateButtonHover(element) {
  return anime({
    targets: element,
    scale: [1, 1.05],
    boxShadow: [
      '0 4px 15px rgba(0,243,255,0.2)',
      '0 8px 30px rgba(0,243,255,0.4), 0 0 40px rgba(0,243,255,0.2)',
    ],
    duration: 300,
    easing: 'easeOutQuad',
  });
}

/**
 * Submit button morph leave
 */
export function animateButtonLeave(element) {
  return anime({
    targets: element,
    scale: [1.05, 1],
    boxShadow: [
      '0 8px 30px rgba(0,243,255,0.4)',
      '0 4px 15px rgba(0,243,255,0.2)',
    ],
    duration: 300,
    easing: 'easeOutQuad',
  });
}

/**
 * Success sequence: airplane → envelope → tick
 */
export function animateSuccessSequence(containerSelector) {
  const tl = anime.timeline({
    easing: 'easeOutExpo',
  });

  // Airplane flies up
  tl.add({
    targets: `${containerSelector} .success-plane`,
    translateY: [0, -60],
    translateX: [0, 60],
    rotate: [0, -20],
    opacity: [1, 0],
    scale: [1, 0.5],
    duration: 600,
  });

  // Envelope appears and closes
  tl.add({
    targets: `${containerSelector} .success-envelope`,
    opacity: [0, 1],
    scale: [0.5, 1],
    rotateX: [30, 0],
    duration: 500,
  }, '-=200');

  // Tick appears
  tl.add({
    targets: `${containerSelector} .success-tick`,
    opacity: [0, 1],
    scale: [0, 1],
    duration: 500,
    easing: 'easeOutElastic(1, .5)',
  }, '+=300');

  return tl;
}

/**
 * Contact section title animation
 */
export function animateContactTitle(selector = '.contact-title-letter') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [40, 0],
    rotateZ: [10, 0],
    duration: 600,
    delay: anime.stagger(50),
    easing: 'easeOutExpo',
  });
}
