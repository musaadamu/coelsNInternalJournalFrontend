import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/* ─── Data ──────────────────────────────────────────────────────────────── */

const dacMenuLinks = [
  { label: 'Home', to: '/' },
  { label: 'Management Board', to: '/management-board' },
  { label: 'Affiliating Institutions and their Programs', to: '/affiliating-institutions' },
];

const quickLinks = [
  { label: 'YSU Mail', href: 'https://mail.ysu.edu.ng' },
  { label: 'YSU Learning Management System', href: 'https://lms.ysu.edu.ng' },
  { label: 'Library', href: 'https://library.ysu.edu.ng' },
  { label: 'TETFund Interventions', href: 'https://ysu.edu.ng/tetfund' },
  { label: 'Giving / Donations', href: 'https://ysu.edu.ng/giving' },
  { label: 'Global Locations', href: 'https://ysu.edu.ng/locations' },
  { label: 'Health & Safety', href: 'https://ysu.edu.ng/health-safety' },
  { label: 'Sitemap', href: 'https://ysu.edu.ng/sitemap' },
  { label: 'Aper Forms', href: 'https://ysu.edu.ng/aper-forms' },
  { label: 'Open Educational Resources (OER)', href: 'https://ysu.edu.ng/oer' },
  { label: 'Student Management Information System (SMIS)', href: 'https://smis.ysu.edu.ng' },
  { label: 'UG Registration Portal', href: 'https://reg.ysu.edu.ng' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/yobestateuniversity',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/yobestateuniversity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/school/yobe-state-university',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/YobeStateUni',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@yobestateuniversity',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

const bottomNavLinks = [
  { label: 'About YSU', to: '/about' },
  { label: 'Admissions', href: 'https://ysu.edu.ng/admissions' },
  { label: 'Calendars', href: 'https://ysu.edu.ng/calendars' },
  { label: 'Campuses', href: 'https://ysu.edu.ng/campuses' },
  { label: 'Careers', href: 'https://ysu.edu.ng/careers' },
  { label: 'Enterprises', href: 'https://ysu.edu.ng/enterprises' },
  { label: 'Global Locations', href: 'https://ysu.edu.ng/locations' },
  { label: 'Giving / Donations', href: 'https://ysu.edu.ng/giving' },
  { label: 'Health & Safety', href: 'https://ysu.edu.ng/health-safety' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Gallery', href: 'https://ysu.edu.ng/gallery' },
  { label: 'Sitemap', href: 'https://ysu.edu.ng/sitemap' },
  { label: 'Student Portal', href: 'https://portal.ysu.edu.ng' },
];

/* ─── Component ─────────────────────────────────────────────────────────── */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="ysu-footer" role="contentinfo">

      {/* ══ SECTION 1: About + DAC + Quick Links ══════════════════════════ */}
      <div className="ysu-footer__upper">
        <div className="ysu-footer__container">

          {/* About YSU */}
          <div className="ysu-footer__col ysu-footer__col--about">
            <div className="ysu-footer__logo-row">
              <img
                src="/images/logo.jpg"
                alt="Yobe State University Crest"
                className="ysu-footer__logo"
              />
              <div>
                <h2 className="ysu-footer__uni-name">YOBE STATE UNIVERSITY</h2>
                <p className="ysu-footer__uni-place">Damaturu, Nigeria</p>
              </div>
            </div>

            <h3 className="ysu-footer__section-title">About YSU</h3>
            <p className="ysu-footer__brief">
              The noble idea of establishing a state university in Damaturu was recommended by the
              committee on a blueprint for the educational development of Yobe State. Following
              NUC's encouragement of state and private organizations to establish viable
              universities, the state under the leadership of His Excellency Governor Bukar Abba
              Ibrahim decided to establish a university named Bukar Abba Ibrahim University —
              now Yobe State University — in January 2007.
            </p>
            <p className="ysu-footer__brief">
              The academic brief, the law and master plan were produced and approved by the
              National Universities Commission (NUC). The university is planned over a 25-year
              period providing the vision, mission, philosophy, and research policy for its growth.
            </p>

            {/* Newsletter */}
            <div className="ysu-footer__newsletter">
              <h4 className="ysu-footer__mini-title">Subscribe to Newsletter</h4>
              {subscribed ? (
                <p className="ysu-footer__subscribed-msg">✓ Thank you for subscribing!</p>
              ) : (
                <form className="ysu-footer__newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="ysu-footer__newsletter-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="ysu-footer__newsletter-btn">Subscribe</button>
                </form>
              )}
            </div>
          </div>

          {/* DAC Menu */}
          <div className="ysu-footer__col">
            <h3 className="ysu-footer__section-title">DAC Menu</h3>
            <ul className="ysu-footer__link-list">
              {dacMenuLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="ysu-footer__link">
                    <span className="ysu-footer__chevron">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="ysu-footer__col">
            <h3 className="ysu-footer__section-title">Quick Links</h3>
            <ul className="ysu-footer__link-list">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="ysu-footer__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ysu-footer__chevron">›</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div className="ysu-footer__col">
            {/* Social Links */}
            <h3 className="ysu-footer__section-title">Social Links</h3>
            <div className="ysu-footer__social-row">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="ysu-footer__social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact Cards */}
            <div className="ysu-footer__contact-cards">
              <div className="ysu-footer__contact-card">
                <div className="ysu-footer__contact-icon">📞</div>
                <div>
                  <p className="ysu-footer__contact-label">MAKE AN APPOINTMENT</p>
                  <a href="tel:+2349064520047" className="ysu-footer__contact-value">
                    +234 906 452 0047
                  </a>
                  <p className="ysu-footer__contact-hours">Office Hours: Mon – Fri 8am to 4pm</p>
                </div>
              </div>

              <div className="ysu-footer__contact-card">
                <div className="ysu-footer__contact-icon">✉️</div>
                <div>
                  <p className="ysu-footer__contact-label">SEND US AN E-MAIL</p>
                  <a href="mailto:ict@ysu.edu.ng" className="ysu-footer__contact-value">
                    ict@ysu.edu.ng
                  </a>
                </div>
              </div>

              <div className="ysu-footer__contact-card">
                <div className="ysu-footer__contact-icon">📍</div>
                <div>
                  <p className="ysu-footer__contact-label">VISIT US</p>
                  <address className="ysu-footer__address">
                    KM 7, Sir Kashim Ibrahim Way<br />
                    P.M.B. 1144, Damaturu<br />
                    Yobe State, Nigeria
                  </address>
                  <a
                    href="https://maps.google.com/?q=Yobe+State+University+Damaturu"
                    className="ysu-footer__map-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map →
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══ SECTION 2: Bottom Navigation Strip ════════════════════════════ */}
      <div className="ysu-footer__mid">
        <div className="ysu-footer__container">
          <nav className="ysu-footer__bottom-nav" aria-label="Footer site navigation">
            {bottomNavLinks.map((item, i) => (
              <span key={i} className="ysu-footer__bottom-nav-item">
                {item.to ? (
                  <Link to={item.to} className="ysu-footer__bottom-link">{item.label}</Link>
                ) : (
                  <a href={item.href} className="ysu-footer__bottom-link" target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                )}
                {i < bottomNavLinks.length - 1 && (
                  <span className="ysu-footer__bottom-sep" aria-hidden="true"> · </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* ══ SECTION 3: Copyright Bar ═══════════════════════════════════════ */}
      <div className="ysu-footer__bottom">
        <div className="ysu-footer__container ysu-footer__copyright-row">
          <p className="ysu-footer__copyright">
            &copy; {currentYear} Yobe State University — COELS Internal Journal. All rights reserved.
          </p>
          <div className="ysu-footer__legal-links">
            <Link to="/privacy" className="ysu-footer__legal-link">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="ysu-footer__legal-link">Terms of Use</Link>
            <span>|</span>
            <Link to="/accessibility" className="ysu-footer__legal-link">Accessibility</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
