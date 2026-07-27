// ═══════════════════════════════════════════════════════════════
//  HERO ANIMATION — Floating text, letter reveal, neon glow
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Hero name letter-by-letter reveal
 */
export function animateHeroName(selector = '.hero-letter') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [50, 0],
    rotateX: [90, 0],
    filter: ['blur(6px)', 'blur(0px)'],
    duration: 800,
    delay: anime.stagger(60, { start: 300 }),
    easing: 'easeOutExpo',
  });
}

/**
 * Hero role/subtitle reveal
 */
export function animateHeroRole(selector = '.hero-role') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 900,
    delay: 1200,
    easing: 'easeOutExpo',
  });
}

/**
 * Hero social links stagger
 */
export function animateHeroSocials(selector = '.hero-social') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    scale: [0, 1],
    delay: anime.stagger(100, { start: 1600 }),
    duration: 500,
    easing: 'easeOutBack',
  });
}

/**
 * Hero CTA button reveal
 */
export function animateHeroCTA(selector = '.hero-cta') {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 700,
    delay: 2000,
    easing: 'easeOutExpo',
  });
}

/**
 * Floating text animation (continuous)
 */
export function animateFloatingText(selector = '.hero-name-container') {
  return anime({
    targets: selector,
    translateY: [-8, 8],
    duration: 3000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
  });
}

/**
 * Neon glow pulse (continuous)
 */
export function animateNeonGlow(selector = '.hero-name-container') {
  return anime({
    targets: selector,
    textShadow: [
      '0 0 10px rgba(0,243,255,0.5), 0 0 40px rgba(0,243,255,0.2)',
      '0 0 20px rgba(0,243,255,0.8), 0 0 60px rgba(0,243,255,0.4), 0 0 100px rgba(0,243,255,0.2)',
    ],
    duration: 2000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
  });
}
