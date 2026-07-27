// ═══════════════════════════════════════════════════════════════
//  EASTER EGGS — Konami, Matrix mode, sudo hire samar
// ═══════════════════════════════════════════════════════════════
import anime from 'animejs/lib/anime.es.js';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/**
 * Initialize all easter egg listeners
 */
export function initEasterEggs() {
  let konamiIndex = 0;
  let logoClicks = 0;
  let typedCommand = '';

  // Konami Code → Developer Mode
  const handleKonami = (e) => {
    if (e.key === KONAMI_CODE[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI_CODE.length) {
        activateDevMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  };

  // Logo ×10 → Matrix Mode
  const handleLogoClick = () => {
    logoClicks++;
    if (logoClicks >= 10) {
      activateMatrixMode();
      logoClicks = 0;
    }
    setTimeout(() => { logoClicks = 0; }, 3000);
  };

  // Typing "sudo hire samar" → Access Granted
  const handleTyping = (e) => {
    typedCommand += e.key;
    if (typedCommand.length > 20) {
      typedCommand = typedCommand.slice(-20);
    }
    if (typedCommand.includes('sudo hire samar')) {
      activateAccessGranted();
      typedCommand = '';
    }
  };

  document.addEventListener('keydown', handleKonami);
  document.addEventListener('keydown', handleTyping);

  // Attach logo click to nav logo
  const logo = document.querySelector('.nav-logo');
  if (logo) logo.addEventListener('click', handleLogoClick);

  return () => {
    document.removeEventListener('keydown', handleKonami);
    document.removeEventListener('keydown', handleTyping);
    if (logo) logo.removeEventListener('click', handleLogoClick);
  };
}

function activateDevMode() {
  showOverlay('⌨️ DEVELOPER MODE ACTIVATED', 'You found the Konami Code!', '#00f3ff');
}

function activateMatrixMode() {
  showOverlay('🟩 MATRIX MODE', 'You clicked the logo 10 times!', '#22c55e');
  // Add temporary matrix rain
  document.body.classList.add('matrix-mode');
  setTimeout(() => document.body.classList.remove('matrix-mode'), 5000);
}

function activateAccessGranted() {
  showOverlay('✅ ACCESS GRANTED', 'sudo hire samar — Permission accepted!', '#fbbf24');
}

function showOverlay(title, subtitle, color) {
  const overlay = document.createElement('div');
  overlay.className = 'easter-egg-overlay';
  overlay.innerHTML = `
    <div class="ee-content">
      <div class="ee-title" style="color: ${color}">${title}</div>
      <div class="ee-subtitle">${subtitle}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  const tl = anime.timeline({ easing: 'easeOutExpo' });

  tl.add({
    targets: overlay,
    opacity: [0, 1],
    duration: 300,
  });

  tl.add({
    targets: '.ee-title',
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 600,
    easing: 'easeOutElastic(1, .5)',
  });

  tl.add({
    targets: '.ee-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 400,
  }, '-=200');

  // Auto dismiss
  tl.add({
    targets: overlay,
    opacity: [1, 0],
    duration: 500,
    delay: 2500,
    complete: () => overlay.remove(),
  });
}
