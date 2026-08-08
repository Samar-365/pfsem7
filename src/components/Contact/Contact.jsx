// ═══════════════════════════════════════════════════════════════
//  CONTACT SECTION — Bento Grid Layout with Anime.js
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import useScrollAnimation from '../../hooks/useScrollAnimation.js';
import { PERSONAL, SOCIAL_LINKS } from '../../data/portfolioData.js';
import {
  Send, Plane, Mail as Envelope, Check, MapPin, Copy,
} from 'lucide-react';
import { Github, Linkedin, Twitter, Instagram, Mail } from '../Icons.jsx';
import styles from './Contact.module.css';

const iconMap = { Github, Linkedin, Twitter, Instagram, Mail };

export default function Contact() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [formState, setFormState] = useState('idle'); // idle → sending → success → error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      // Title
      anime({
        targets: `.${styles.titleLetter}`,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 600,
        delay: anime.stagger(50),
        easing: 'easeOutExpo',
      });

      // Bento cards entrance
      anime({
        targets: `.${styles.bentoCard}`,
        opacity: [0, 1],
        translateY: [80, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutExpo',
        complete: (anim) => {
          anim.animatables.forEach((a) => {
            a.target.style.transform = '';
          });
        },
      });
    }
  }, [isVisible]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerSuccessAnimation = () => {
    setFormState('success');
    setFormData({ name: '', email: '', message: '' });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMessage('');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;
    const web3Key = import.meta.env.VITE_WEB3FORMS_KEY;

    let endpoint = '';
    let payload = {};

    if (formspreeId || formspreeUrl) {
      endpoint = formspreeUrl || `https://formspree.io/f/${formspreeId}`;
      payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };
    } else if (web3Key) {
      endpoint = 'https://api.web3forms.com/submit';
      payload = {
        access_key: web3Key,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: `New Portfolio Message from ${formData.name}`,
      };
    } else {
      // Default Zero-Config provider using FormSubmit.co
      endpoint = `https://formsubmit.co/ajax/${PERSONAL.email}`;
      payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `New Portfolio Contact Message from ${formData.name}`,
        _captcha: 'false',
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      const isSuccess = response.ok || result.success === 'true' || result.success === true || result.ok;

      if (isSuccess) {
        triggerSuccessAnimation();
      } else if (result.message && result.message.includes('Activation')) {
        // FormSubmit requires a 1-click activation link for new emails
        triggerSuccessAnimation();
      } else {
        setErrorMessage(result.error || result.message || 'Failed to send message. Please try again.');
        setFormState('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again later.');
      setFormState('error');
    }
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

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* 1. Main Contact Form Card (Spans 2 Columns) */}
          <div className={`${styles.bentoCard} ${styles.formCard} hoverable`} style={{ opacity: 0 }}>
            {/* Manga Accent Slash Line */}
            <div className={styles.slashLine} />
            
            <h3 className={styles.cardHeaderTitle}>
              <Envelope size={20} className={styles.cardHeaderIcon} />
              Send a Message
            </h3>

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
                  {errorMessage && (
                    <div style={{ color: '#ff4d4d', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      {errorMessage}
                    </div>
                  )}

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      placeholder="Tell me about your project or inquiry..."
                      rows={4}
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
          </div>

          {/* 2. Direct Email Card */}
          <div className={`${styles.bentoCard} ${styles.emailCard} hoverable`} style={{ opacity: 0 }}>
            {/* Manga Accent Slash Line */}
            <div className={styles.slashLine} />

            <div className={styles.badgeWrap}>
              <Envelope size={22} className={styles.badgeIcon} />
            </div>
            
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>Direct Email</span>
              <a href={`mailto:${PERSONAL.email}`} className={styles.emailLink}>
                {PERSONAL.email}
              </a>
            </div>

            <button className={styles.copyBtn} onClick={handleCopyEmail} title="Copy email address">
              <Copy size={14} />
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          {/* 3. Availability Status Card */}
          <div className={`${styles.bentoCard} ${styles.statusCard} hoverable`} style={{ opacity: 0 }}>
            {/* Manga Accent Slash Line */}
            <div className={styles.slashLine} />

            <div className={styles.statusHeader}>
              <span className={styles.pulseDot} />
              <span className={styles.statusBadge}>Available for Hire</span>
            </div>

            <h4 className={styles.statusTitle}>Full-Stack & AI Development</h4>
            <p className={styles.statusDesc}>
              Open to freelance contracts, full-time engineering roles, and AI project collaborations.
            </p>

            <div className={styles.locationTag}>
              <MapPin size={14} />
              <span>{PERSONAL.location} (Remote Available)</span>
            </div>
          </div>

          {/* 4. Social Links Bento Card (Spans 2 Columns) */}
          <div className={`${styles.bentoCard} ${styles.socialBentoCard} hoverable`} style={{ opacity: 0 }}>
            {/* Manga Accent Slash Line */}
            <div className={styles.slashLine} />

            <h3 className={styles.cardHeaderTitle}>
              Connect Across Platforms
            </h3>

            <div className={styles.socialGrid}>
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon] || Envelope;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialTile} hoverable`}
                  >
                    <Icon size={20} className={styles.socialTileIcon} />
                    <div>
                      <span className={styles.socialName}>{link.name}</span>
                      <span className={styles.socialHandle}>{link.handle}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
