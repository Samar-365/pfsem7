// ═══════════════════════════════════════════════════════════════
//  CURSOR ANIMATION — Custom cursor with magnetic + trail
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

/**
 * Initialize custom cursor tracking
 */
export function initCursor(cursorRef, cursorDotRef) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  // Smooth follow with lerp
  function update() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    }

    requestAnimationFrame(update);
  }

  document.addEventListener('mousemove', onMouseMove);
  update();

  return () => document.removeEventListener('mousemove', onMouseMove);
}

/**
 * Expand cursor on hover over interactive elements
 */
export function cursorHoverExpand(cursorRef) {
  anime({
    targets: cursorRef.current,
    width: [40, 60],
    height: [40, 60],
    borderWidth: [2, 3],
    opacity: [0.6, 0.9],
    duration: 300,
    easing: 'easeOutBack',
  });
}

/**
 * Shrink cursor back
 */
export function cursorHoverShrink(cursorRef) {
  anime({
    targets: cursorRef.current,
    width: [60, 40],
    height: [60, 40],
    borderWidth: [3, 2],
    opacity: [0.9, 0.6],
    duration: 300,
    easing: 'easeOutQuad',
  });
}

/**
 * Ripple effect on click
 */
export function cursorRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'cursor-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);

  anime({
    targets: ripple,
    width: [0, 80],
    height: [0, 80],
    opacity: [0.5, 0],
    marginLeft: [0, -40],
    marginTop: [0, -40],
    duration: 600,
    easing: 'easeOutExpo',
    complete: () => ripple.remove(),
  });
}
