// ═══════════════════════════════════════════════════════════════
//  BACKGROUND ANIMATION — Constellation / particle grid
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Create and animate constellation dots on a canvas-like div grid
 */
export function animateConstellationDots(containerSelector = '.bg-constellation') {
  const container = document.querySelector(containerSelector);
  if (!container) return null;

  // Create dots
  const dotCount = 60;
  container.innerHTML = '';

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'constellation-dot';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(dot);
  }

  // Animate all dots
  return anime({
    targets: '.constellation-dot',
    opacity: [
      { value: 0.2, duration: 1500 },
      { value: 0.8, duration: 1500 },
    ],
    scale: [
      { value: 0.5, duration: 1500 },
      { value: 1.2, duration: 1500 },
    ],
    translateX: () => anime.random(-30, 30),
    translateY: () => anime.random(-30, 30),
    delay: anime.stagger(50, { grid: [10, 6], from: 'center' }),
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
  });
}

/**
 * Animate grid lines
 */
export function animateGridLines(containerSelector = '.bg-grid') {
  const container = document.querySelector(containerSelector);
  if (!container) return null;

  container.innerHTML = '';
  const lineCount = 20;

  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line';
    line.style.left = `${(i / lineCount) * 100}%`;
    container.appendChild(line);
  }

  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line grid-line-h';
    line.style.top = `${(i / lineCount) * 100}%`;
    container.appendChild(line);
  }

  return anime({
    targets: '.grid-line',
    opacity: [0.02, 0.08],
    duration: 4000,
    direction: 'alternate',
    loop: true,
    delay: anime.stagger(100),
    easing: 'easeInOutSine',
  });
}

/**
 * Floating particle rain (pixel rain effect)
 */
export function animateParticleRain(containerSelector = '.bg-particles') {
  const container = document.querySelector(containerSelector);
  if (!container) return null;

  container.innerHTML = '';
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'rain-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${-10 - Math.random() * 20}%`;
    particle.style.width = `${2 + Math.random() * 3}px`;
    particle.style.height = `${10 + Math.random() * 20}px`;
    container.appendChild(particle);
  }

  return anime({
    targets: '.rain-particle',
    translateY: ['0vh', '120vh'],
    opacity: [
      { value: 0.6, duration: 500 },
      { value: 0, duration: 500, delay: 2000 },
    ],
    duration: () => 3000 + Math.random() * 4000,
    delay: anime.stagger(150, { from: 'random' }),
    loop: true,
    easing: 'linear',
  });
}
