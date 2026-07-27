// ═══════════════════════════════════════════════════════════════
//  PROJECTS SECTION — Interactive terminal-style project cards
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { PROJECTS } from '../../data/portfolioData.js';
import {
  Folder, Terminal, Code2, ExternalLink, X, ChevronRight,
} from 'lucide-react';
import { Github } from '../Icons.jsx';
import styles from './Projects.module.css';

export default function Projects() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const [activeProject, setActiveProject] = useState(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      anime({
        targets: `.${styles.titleLetter}`,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(40),
        easing: 'easeOutExpo',
      });

      anime({
        targets: `.${styles.card}`,
        opacity: [0, 1],
        translateY: [80, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutExpo',
      });
    }
  }, [isVisible]);

  const openProject = (project) => {
    setActiveProject(project);
    // Animate modal in
    setTimeout(() => {
      anime({
        targets: `.${styles.modal}`,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad',
      });
      anime({
        targets: `.${styles.modalContent}`,
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 500,
        easing: 'easeOutBack',
      });
      // Terminal lines stagger
      anime({
        targets: `.${styles.termLine}`,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 400,
        delay: anime.stagger(80, { start: 400 }),
        easing: 'easeOutQuad',
      });
      // Tech tags stagger
      anime({
        targets: `.${styles.techTag}`,
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: anime.stagger(60, { start: 800 }),
        duration: 400,
        easing: 'easeOutBack',
      });
    }, 50);
  };

  const closeProject = () => {
    anime({
      targets: `.${styles.modalContent}`,
      scale: [1, 0.9],
      opacity: [1, 0],
      duration: 300,
      easing: 'easeInQuad',
      complete: () => setActiveProject(null),
    });
  };

  const titleLetters = 'Projects'.split('');

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {titleLetters.map((ch, i) => (
            <span key={i} className={styles.titleLetter} style={{ opacity: 0 }}>
              {ch}
            </span>
          ))}
        </h2>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`${styles.card} project-card hoverable`}
              style={{ opacity: 0, '--project-color': project.color }}
              onClick={() => openProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openProject(project)}
            >
              <div className={styles.cardTop}>
                <Folder size={20} style={{ color: project.color }} />
                <span className={styles.cardCategory}>{project.category}</span>
              </div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardSubtitle}>{project.subtitle}</p>
              <p className={styles.cardDesc}>{project.shortDesc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.viewMore}>
                  <Terminal size={14} />
                  Open Terminal
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className={styles.modal} onClick={closeProject}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Terminal Header */}
            <div className={styles.termHeader}>
              <div className={styles.termDots}>
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#ffbd2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <span className={styles.termTitle}>
                ~/projects/{activeProject.title.toLowerCase().replace(/\s+/g, '-')}
              </span>
              <button className={styles.termClose} onClick={closeProject} aria-label="Close">
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className={styles.termBody}>
              <div className={styles.termLine}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>cat README.md</span>
              </div>
              <div className={styles.termLine}>
                <h3 className={styles.termProjectName} style={{ color: activeProject.color }}>
                  {activeProject.title} — {activeProject.subtitle}
                </h3>
              </div>
              <div className={styles.termLine}>
                <p className={styles.termDesc}>{activeProject.fullDesc}</p>
              </div>

              <div className={styles.termLine}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>ls features/</span>
              </div>
              {activeProject.features.map((feature, i) => (
                <div key={i} className={styles.termLine}>
                  <span className={styles.termFeature}>
                    <ChevronRight size={14} />
                    {feature}
                  </span>
                </div>
              ))}

              <div className={styles.termLine}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>cat tech-stack.json</span>
              </div>
              <div className={styles.techTags}>
                {activeProject.techStack.map((tech, i) => (
                  <span key={i} className={styles.techTag} style={{ opacity: 0 }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.termActions}>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.termBtn} hoverable`}
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.termBtn} ${styles.termBtnPrimary} hoverable`}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
