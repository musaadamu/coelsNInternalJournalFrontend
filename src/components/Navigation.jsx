import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ user, toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      if (!mobileView) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Main navigation links with formatted labels for proper alignment
  const mainNavLinks = [
    { to: "/", label: "Home", topLine: "Home", bottomLine: "" },
    { to: "/journals", label: "Journals", topLine: "Journals", bottomLine: "" },
    { to: "/archive", label: "Archive", topLine: "Archive", bottomLine: "" },
    { to: "/about", label: "About Us", topLine: "About", bottomLine: "Us" },
    { to: "/guide", label: "Author's Guide", topLine: "Author's", bottomLine: "Guide" },
    { to: "/contact", label: "Contact", topLine: "Contact", bottomLine: "" }
  ];

  // User navigation links with formatted labels for proper alignment
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard", topLine: "Dashboard", bottomLine: "" },
    ...(user.role === "admin" ? [{ to: "/manage-journals", label: "Manage Journals", topLine: "Manage", bottomLine: "Journals" }] : []),
    { to: "/updateprofile", label: "Profile", topLine: "Profile", bottomLine: "" },
    { to: "/logout", label: "Logout", topLine: "Logout", bottomLine: "" }
  ] : [
    { to: "/register", label: "Register", topLine: "Register", bottomLine: "" },
    { to: "/login", label: "Login", topLine: "Login", bottomLine: "" }
  ];

  return (
    <nav className={`modern-navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo-section">
          <NavLink to="/" className="logo-link">
            <img
              src="/images/logo.jpg"
              alt="COELSN Journal Logo"
              className="nav-logo-image"
            />
            <div className="logo-text">
              <span className="logo-title">COELSN Journal</span>
              <span className="logo-subtitle">Interdisciplinary Academic Research</span>
            </div>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
          aria-expanded={menuOpen}
        >
          <span className={`menu-icon ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation Menu */}
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          {/* Main Navigation */}
          <ul className="main-nav-links">
            {mainNavLinks.map((link, index) => (
              <li key={`main-${index}`} className="nav-item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                >
                  <span className="nav-text-container">
                    <span className="nav-text-top">{link.topLine}</span>
                    {link.bottomLine && <span className="nav-text-bottom">{link.bottomLine}</span>}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* User Navigation */}
          <ul className="user-nav-links">
            {userNavLinks.map((link, index) => (
              <li key={`user-${index}`} className="nav-item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? `nav-link user-link active ${link.label === "Login" || link.label === "Register" ? "highlight" : ""}`
                      : `nav-link user-link ${link.label === "Login" || link.label === "Register" ? "highlight" : ""}`
                  }
                  onClick={closeMenu}
                >
                  {(link.label === "Login" || link.label === "Register") ? (
                    link.label
                  ) : (
                    <span className="nav-text-container">
                      <span className="nav-text-top">{link.topLine}</span>
                      {link.bottomLine && <span className="nav-text-bottom">{link.bottomLine}</span>}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar Toggle Button (Mobile only) */}
        <button
          className="sidebar-toggle-button mobile-only"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <span className="sidebar-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
