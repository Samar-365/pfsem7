// ═══════════════════════════════════════════════════════════════
//  INTRO ANIMATION — Loading Screen + Cinematic Intro
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Animate the loading progress bar from 0% to 100%
 */
export function animateLoader(progressRef, percentRef, onComplete) {
  const tl = anime.timeline({
    easing: 'easeInOutQuad',
    complete: onComplete,
  });

  tl.add({
    targets: { value: 0 },
    value: 100,
    duration: 2500,
    round: 1,
    easing: 'easeInOutExpo',
    update: (anim) => {
      const val = Math.round(anim.animations[0].currentValue);
      if (percentRef.current) percentRef.current.textContent = `${val}%`;
      if (progressRef.current) progressRef.current.style.width = `${val}%`;
    },
  });

  return tl;
}

/**
 * Cinematic intro sequence after loading
 * BLACK → Typing "Samar Shetye" → Glitch → Camera Zoom → Reveal
 */
export function playIntroSequence(containerRef, onComplete) {
  const tl = anime.timeline({
    easing: 'easeOutExpo',
    complete: onComplete,
  });

  // Phase 1: Name typing reveal
  tl.add({
    targets: '.intro-letter',
    opacity: [0, 1],
    translateY: [40, 0],
    filter: ['blur(8px)', 'blur(0px)'],
    duration: 80,
    delay: anime.stagger(70),
  });

  // Phase 2: Glitch effect
  tl.add({
    targets: '.intro-name',
    translateX: [
      { value: -8, duration: 50 },
      { value: 8, duration: 50 },
      { value: -4, duration: 50 },
      { value: 0, duration: 50 },
    ],
    filter: [
      { value: 'hue-rotate(90deg)', duration: 50 },
      { value: 'hue-rotate(0deg)', duration: 50 },
    ],
    easing: 'easeInOutQuad',
  }, '+=300');

  // Phase 3: Subtitle fade
  tl.add({
    targets: '.intro-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
  }, '-=100');

  // Phase 4: Camera zoom + fade out
  tl.add({
    targets: '.intro-container',
    scale: [1, 1.5],
    opacity: [1, 0],
    filter: ['blur(0px)', 'blur(20px)'],
    duration: 800,
    easing: 'easeInExpo',
  }, '+=600');

  return tl;
}
