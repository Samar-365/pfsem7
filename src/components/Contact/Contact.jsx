// ═══════════════════════════════════════════════════════════════
//  CONTACT SECTION — Self-drawing form + success animation
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { PERSONAL, SOCIAL_LINKS } from '../../data/portfolioData.js';
import {
  Send, Plane, Mail as Envelope, Check,
} from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Mail } from '../Icons.jsx';
import styles from './Contact.module.css';

const iconMap = { Github, Linkedin, Twitter, Instagram, Mail };

export default function Contact() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [formState, setFormState] = useState('idle'); // idle → sending → success
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Title
      anime({
        targets: `.${styles.titleLetter}`,
        opacity: [0, 1],
        translateY: [40, 0],
        rotateZ: [10, 0],
        duration: 600,
        delay: anime.stagger(50),
        easing: 'easeOutExpo',
      });

      // Form fields draw-in
      anime({
        targets: `.${styles.field}`,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutExpo',
      });

      // Social links
      anime({
        targets: `.${styles.socialLink}`,
        opacity: [0, 1],
        scale: [0, 1],
        delay: anime.stagger(100, { start: 900 }),
        duration: 500,
        easing: 'easeOutBack',
      });
    }
  }, [isVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');

    // Simulate send
    setTimeout(() => {
      setFormState('success');

      // Success animation sequence
      const tl = anime.timeline({ easing: 'easeOutExpo' });

      tl.add({
        targets: `.${styles.successPlane}`,
        translateY: [0, -60],
        translateX: [0, 60],
        rotate: [0, -20],
        opacity: [1, 0],
        scale: [1, 0.5],
        duration: 600,
      });

      tl.add({
        targets: `.${styles.successEnvelope}`,
        opacity: [0, 1],
        scale: [0.5, 1],
        rotateX: [30, 0],
        duration: 500,
      }, '-=200');

      tl.add({
        targets: `.${styles.successTick}`,
        opacity: [0, 1],
        scale: [0, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)',
      }, '+=300');

      setTimeout(() => setFormState('idle'), 4000);
    }, 1500);
  };

  const titleLetters = 'Get In Touch'.split('');

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {titleLetters.map((ch, i) => (
            <span key={i} className={styles.titleLetter} style={{ opacity: 0 }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h2>

        <p className={styles.subtitle}>
          Have a project in mind or want to collaborate? Let&apos;s connect!
        </p>

        <div className={styles.grid}>
          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {formState === 'success' ? (
              <div className={styles.successContainer}>
                <div className={styles.successPlane}><Plane size={40} /></div>
                <div className={styles.successEnvelope} style={{ opacity: 0 }}><Envelope size={40} /></div>
                <div className={styles.successTick} style={{ opacity: 0 }}><Check size={48} /></div>
                <p className={styles.successText}>Message sent successfully!</p>
              </div>
            ) : (
              <>
                <div className={`${styles.field}`} style={{ opacity: 0 }}>
                  <label className={styles.label}>Name</label>
                  <input
                    type="text"
                    className={`${styles.input} contact-field`}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className={`${styles.field}`} style={{ opacity: 0 }}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={`${styles.input} contact-field`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className={`${styles.field}`} style={{ opacity: 0 }}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    className={`${styles.textarea} contact-field`}
                    placeholder="Your message..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`${styles.submitBtn} hoverable`}
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Let&apos;s Connect</h3>
              <p className={styles.infoDesc}>
                Feel free to reach out through any of these platforms.
                I&apos;m always open to discussing new opportunities!
              </p>

              <div className={styles.socialGrid}>
                {SOCIAL_LINKS.map((link) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.socialLink} hoverable`}
                      style={{ '--link-color': link.color, opacity: 0 }}
                    >
                      <Icon size={20} />
                      <div>
                        <span className={styles.linkName}>{link.name}</span>
                        <span className={styles.linkHandle}>{link.handle}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
