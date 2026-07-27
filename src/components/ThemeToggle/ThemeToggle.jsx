// ═══════════════════════════════════════════════════════════════
//  THEME TOGGLE — Cycle between themes with smooth transition
// ═══════════════════════════════════════════════════════════════
import { Palette } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className={`${styles.toggle} hoverable`}
      onClick={onToggle}
      aria-label={`Current theme: ${theme}. Click to switch.`}
      title={`Theme: ${theme}`}
    >
      <Palette size={18} />
      <span className={styles.label}>{theme}</span>

      {/* Theme flash overlay */}
      <div className="theme-flash" />
    </button>
  );
}
