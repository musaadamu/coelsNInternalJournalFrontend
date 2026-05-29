import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidePanel.css';

// ── DAC Menu links (internal routes) ───────────────────────────────────────
const dacMenuItems = [
  { label: 'Home', to: '/', icon: '🏠' },
  { label: 'Management Board', to: '/management-board', icon: '👥' },
  { label: 'Affiliating Institutions and their Programs', to: '/affiliating-institutions', icon: '🏛️' },
];

// ── Quick Links (external URLs) ─────────────────────────────────────────────
const quickLinkItems = [
  { label: 'YSU Mail', href: 'https://mail.ysu.edu.ng', icon: '📧' },
  { label: 'YSU Learning Management System', href: 'https://lms.ysu.edu.ng', icon: '📚' },
  { label: 'Library', href: 'https://library.ysu.edu.ng', icon: '📖' },
  { label: 'TETFund Interventions', href: 'https://ysu.edu.ng/tetfund', icon: '💼' },
  { label: 'Giving / Donations', href: 'https://ysu.edu.ng/giving', icon: '🎁' },
  { label: 'Global Locations', href: 'https://ysu.edu.ng/locations', icon: '🌍' },
  { label: 'Health & Safety', href: 'https://ysu.edu.ng/health-safety', icon: '🏥' },
  { label: 'Sitemap', href: 'https://ysu.edu.ng/sitemap', icon: '🗺️' },
  { label: 'Aper Forms', href: 'https://ysu.edu.ng/aper-forms', icon: '📋' },
  { label: 'Open Educational Resources (OER)', href: 'https://ysu.edu.ng/oer', icon: '🌐' },
  { label: 'Student Management Information System (SMIS)', href: 'https://smis.ysu.edu.ng', icon: '🎓' },
  { label: 'UG Registration Portal', href: 'https://reg.ysu.edu.ng', icon: '✏️' },
];

const SidePanel = () => {
  const location = useLocation();
  const [dacOpen, setDacOpen] = useState(true);
  const [quickOpen, setQuickOpen] = useState(true);

  return (
    <aside className="side-panel" aria-label="DAC Menu and Quick Links">

      {/* ── DAC Menu ─────────────────────────────────────────────────────── */}
      <div className="sp-widget">
        <button
          className="sp-widget-header"
          onClick={() => setDacOpen(o => !o)}
          aria-expanded={dacOpen}
        >
          <span className="sp-widget-title">DAC Menu</span>
          <span className={`sp-chevron ${dacOpen ? 'open' : ''}`}>&#9662;</span>
        </button>

        {dacOpen && (
          <nav className="sp-widget-body">
            <ul className="sp-list">
              {dacMenuItems.map((item, idx) => {
                const isActive = location.pathname === item.to;
                return (
                  <li key={idx} className="sp-list-item">
                    <Link
                      to={item.to}
                      className={`sp-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="sp-icon">{item.icon}</span>
                      <span className="sp-label">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* ── Quick Links ──────────────────────────────────────────────────── */}
      <div className="sp-widget">
        <button
          className="sp-widget-header"
          onClick={() => setQuickOpen(o => !o)}
          aria-expanded={quickOpen}
        >
          <span className="sp-widget-title">Quick Links</span>
          <span className={`sp-chevron ${quickOpen ? 'open' : ''}`}>&#9662;</span>
        </button>

        {quickOpen && (
          <nav className="sp-widget-body">
            <ul className="sp-list">
              {quickLinkItems.map((item, idx) => (
                <li key={idx} className="sp-list-item">
                  <a
                    href={item.href}
                    className="sp-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sp-icon">{item.icon}</span>
                    <span className="sp-label">{item.label}</span>
                    <span className="sp-external-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

    </aside>
  );
};

export default SidePanel;
