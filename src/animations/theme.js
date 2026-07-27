// ═══════════════════════════════════════════════════════════════
//  THEME ANIMATION — Animejs.com Signature Dark & Red Palette
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

export const THEMES = {
  animejs: {
    '--bg-primary': '#212121',
    '--bg-secondary': '#282726',
    '--bg-card': '#2b2a29',
    '--text-primary': '#ffffff',
    '--text-secondary': '#adacab',
    '--accent': '#ff4e4e',
    '--accent-secondary': '#ff7b7b',
    '--accent-glow': 'rgba(255, 78, 78, 0.3)',
    '--border': '#3a3937',
    '--nav-bg': 'rgba(33, 33, 33, 0.92)',
  },
  dark: {
    '--bg-primary': '#191919',
    '--bg-secondary': '#222222',
    '--bg-card': '#2a2a2a',
    '--text-primary': '#f0f0f0',
    '--text-secondary': '#9e9e9e',
    '--accent': '#ff4545',
    '--accent-secondary': '#ff6666',
    '--accent-glow': 'rgba(255, 69, 69, 0.25)',
    '--border': '#333333',
    '--nav-bg': 'rgba(25, 25, 25, 0.9)',
  },
};

/**
 * Smooth theme transition using anime.js
 * Animates CSS custom properties on :root
 */
export function animateThemeTransition(themeName) {
  const theme = THEMES[themeName];
  if (!theme) return;

  const root = document.documentElement;

  // Flash effect
  anime({
    targets: '.theme-flash',
    opacity: [0.3, 0],
    duration: 400,
    easing: 'easeOutQuad',
  });

  Object.entries(theme).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  // Animate all visible elements for a smooth crossfade feel
  anime({
    targets: 'section, nav, .card, .skill-card, .project-card',
    opacity: [0.7, 1],
    duration: 500,
    easing: 'easeOutQuad',
  });
}
