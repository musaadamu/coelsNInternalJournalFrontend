import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ user, toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // Upgraded breakpoint for huge menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [fadeNews, setFadeNews] = useState(true);

  // Dynamic news notices
  const newsItems = [
    "YOBE JOURNAL OF EDUCATIONAL STUDIES (YOJES)",
    "Capacity Building on Entrepreneurship Development and Skill Acquisition for Senior Huffaz with ‘A’ Level exclusively of CRQS Yobe State University",
    "Automatic Admission into One Year Intensive Diploma Program"
  ];

  // Quick Links dropdown options
  const quickLinks = [
    { label: "YSU Mail", to: "https://webmail.ysu.edu.ng" },
    { label: "YSU LMS Portal", to: "https://ysu.edu.ng/science/fslms/" },
    { label: "Library Portal", to: "https://ysu.edu.ng/lib/web/" },
    { label: "Student Portal (SMIS)", to: "https://ysu.edu.ng/smis/" },
    { label: "UG Registration Portal", to: "https://ysu.edu.ng/smis/students" },
    { label: "TETFund Interventions", to: "/tetfund/interventions" },
    { label: "Giving/Donations", to: "/giving-donations" },
    { label: "Health & Safety", to: "/health-safety" },
    { label: "OER Resources", to: "/open-educational-resources" }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Performing search for:", searchQuery);
    alert(`Searching for: "${searchQuery}"`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleOutsideClick = (e) => {
      if (!e.target.closest('.quick-links-dropdown')) {
        setQuickLinksOpen(false);
      }
    };

    // News Ticker Interval
    const newsTimer = setInterval(() => {
      setFadeNews(false);
      setTimeout(() => {
        setActiveNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
        setFadeNews(true);
      }, 300);
    }, 5000);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleOutsideClick);
      clearInterval(newsTimer);
    };
  }, []);

  // Complete, deep YSU hierarchical menu structure
  const menuData = [
    {
      label: "About YSU",
      to: "/about-ysu",
      children: [
        { label: "Newsletter", to: "/about-ysu/newsletter" }
      ]
    },
    {
      label: "Admin",
      to: "/admin",
      children: [
        { label: "The Visitor", to: "/admin/the-visitor" },
        { label: "The Chancellor", to: "/admin/the-chancellor" },
        { label: "The Governing Council", to: "/admin/the-governing-council" },
        { label: "The University Management", to: "/admin/university-management" },
        {
          label: "Units",
          to: "/admin/units",
          children: [
            { label: "Audit", to: "/admin/units/audit" },
            { label: "Bursary", to: "/admin/units/bursary" },
            { label: "Registry", to: "/admin/units/registry" }
          ]
        }
      ]
    },
    {
      label: "Library",
      to: "/library",
      children: [
        { label: "E-Learning", to: "/library/e-learning" }
      ]
    },
    {
      label: "Academics",
      to: "/academics",
      children: [
        {
          label: "Centers",
          to: "/academics/centers",
          children: [
            { label: "Center for Capacity Development on Humanitarian Studies (CRCDHS)", to: "/academics/centers/crcdhs" },
            { label: "Center for Entrepreneurship Development (CED)", to: "/academics/centers/ced" },
            { label: "Center for Research in Qur’anic Studies (CRQS)", to: "/academics/centers/crqs" },
            { label: "Desert Research Monitoring and Control Center (DRMCC)", to: "/academics/centers/drmcc" }
          ]
        },
        {
          label: "Faculties",
          to: "/academics/faculties",
          children: [
            { label: "Arts & Education", to: "/academics/faculties/arts-education" },
            { label: "College of Medical Sciences", to: "/academics/faculties/medical-sciences" },
            { label: "Law", to: "/academics/faculties/law" },
            { label: "Science", to: "/academics/faculties/science" },
            { label: "Social & Management Sciences", to: "/academics/faculties/social-management" }
          ]
        },
        {
          label: "Directorates",
          to: "/academics/directorates",
          children: [
            { label: "Affiliate Colleges", to: "/academics/directorates/affiliate-colleges" },
            { label: "Academic Planning", to: "/academics/directorates/academic-planning" },
            { label: "Consultancy Services", to: "/academics/directorates/consultancy-services" },
            { label: "General Studies", to: "/academics/directorates/general-studies" },
            { label: "ICT", to: "/academics/directorates/ict" },
            { label: "Pre-Degree", to: "/academics/directorates/pre-degree" }
          ]
        },
        {
          label: "Departments A-Z",
          to: "/academics/departments",
          children: [
            { label: "Accounting", to: "/academics/departments/accounting" },
            { label: "African Languages & Linguistics", to: "/academics/departments/african-languages" },
            { label: "Arabic", to: "/academics/departments/arabic" },
            { label: "Biochemistry", to: "/academics/departments/biochemistry" },
            { label: "Biology", to: "/academics/departments/biology" },
            { label: "Business Administration", to: "/academics/departments/business-administration" },
            { label: "Chemistry", to: "/academics/departments/chemistry" },
            { label: "Computer Science", to: "/academics/departments/computer-science" },
            { label: "Economics", to: "/academics/departments/economics" },
            { label: "Education", to: "/academics/departments/education" },
            { label: "English", to: "/academics/departments/english" },
            { label: "History", to: "/academics/departments/history" },
            { label: "Geography", to: "/academics/departments/geography" },
            { label: "Geology", to: "/academics/departments/geology" },
            { label: "Human Anatomy", to: "/academics/departments/human-anatomy" },
            { label: "Human Physiology", to: "/academics/departments/human-physiology" },
            { label: "Islamic Studies", to: "/academics/departments/islamic-studies" },
            { label: "Mathematics & Statistics", to: "/academics/departments/mathematics-statistics" },
            { label: "Microbiology", to: "/academics/departments/microbiology" },
            { label: "Physics", to: "/academics/departments/physics" },
            { label: "Physiotherapy", to: "/academics/departments/physiotherapy" },
            { label: "Political Science", to: "/academics/departments/political-science" },
            { label: "Public Administration", to: "/academics/departments/public-administration" },
            { label: "Sociology", to: "/academics/departments/sociology" }
          ]
        },
        {
          label: "Students",
          to: "/academics/students",
          children: [
            { label: "Students’ Affairs Division", to: "/academics/students/students-affairs" },
            { label: "Security", to: "/academics/students/security" },
            { label: "Sports", to: "/academics/students/sports" }
          ]
        },
        { label: "PG School", to: "/academics/pg-school" },
        { label: "Admissions", to: "/academics/admissions" }
      ]
    },
    {
      label: "Portals",
      to: "/portals",
      children: [
        { label: "Admission Letter", to: "/portals/admission-letter" },
        {
          label: "Clearance & Transcripts",
          to: "/portals/clearance-transcripts",
          children: [
            { label: "Postgraduate", to: "/portals/clearance-transcripts/postgraduate" },
            { label: "Undergraduate", to: "/portals/clearance-transcripts/undergraduate" }
          ]
        },
        {
          label: "Apply",
          to: "/portals/apply",
          children: [
            { label: "CRQS", to: "/portals/apply/crqs" },
            { label: "Pre-Degree", to: "/portals/apply/pre-degree" },
            { label: "Diploma", to: "/portals/apply/diploma" },
            { label: "Undergraduate", to: "/portals/apply/undergraduate" },
            { label: "Postgraduate", to: "/portals/apply/postgraduate" }
          ]
        },
        {
          label: "Registration",
          to: "/portals/registration",
          children: [
            { label: "IJMB", to: "/portals/registration/ijmb" },
            {
              label: "Diploma",
              to: "/portals/registration/diploma",
              children: [
                { label: "3rd Semester", to: "/portals/registration/diploma/3rd-semester" },
                { label: "Diploma Registration", to: "/portals/registration/diploma/register" }
              ]
            },
            { label: "Undergraduate Post UTME/DE", to: "/portals/registration/post-utme" },
            {
              label: "Postgraduate",
              to: "/portals/registration/postgraduate",
              children: [
                { label: "New Student", to: "/portals/registration/postgraduate/new" },
                { label: "Returning student", to: "/portals/registration/postgraduate/returning" }
              ]
            }
          ]
        }
      ]
    },
    { label: "Alumni", to: "/alumni" },
    {
      label: "Research",
      to: "/research",
      children: [
        {
          label: "Journals",
          to: "/research/journals",
          children: [
            { label: "Baobab Journal of Science", to: "/research/journals/baobab" },
            { label: "Al-Muqaddimah Journal of Arts", to: "/research/journals/al-muqaddimah" },
            { label: "Annur International Journal of Arabic and Islamic Studies", to: "/research/journals/annur" },
            { label: "Ngazargamu International Journal of Islamic Studies (NIJIS)", to: "/research/journals/nijis" },
            { label: "Yobe Journal of Educational Studies (YOJES)", to: "/research/journals/yojes" },
            { label: "Yobe Journal of Economics (YOJE)", to: "/research/journals/yoje" },
            { label: "Manuscript Submission", to: "/research/journals/submission" }
          ]
        },
        { label: "AUNS", to: "/research/auns" },
        { label: "BioRTC", to: "/research/biortc" }
      ]
    },
    {
      label: "TETFund",
      to: "/tetfund",
      children: [
        {
          label: "Annual Intervention",
          to: "/tetfund/annual-intervention",
          children: [
            { label: "Academic Manuscript Development", to: "/tetfund/annual-intervention/manuscript-development" },
            { label: "Academic Staff Training & Development", to: "/tetfund/annual-intervention/staff-training" },
            { label: "Academic Research Journal", to: "/tetfund/annual-intervention/research-journal" },
            { label: "Conference Attendance", to: "/tetfund/annual-intervention/conference-attendance" },
            { label: "Entrepreneurship", to: "/tetfund/annual-intervention/entrepreneurship" },
            { label: "Equipment Fabrication", to: "/tetfund/annual-intervention/equipment-fabrication" },
            { label: "ICT Support", to: "/tetfund/annual-intervention/ict-support" },
            { label: "Institution Based Research", to: "/tetfund/annual-intervention/institution-research" },
            { label: "Library Development", to: "/tetfund/annual-intervention/library-development" },
            { label: "Physical Infrastructure/Program Upgrade", to: "/tetfund/annual-intervention/physical-infrastructure" },
            { label: "Teaching Practice", to: "/tetfund/annual-intervention/teaching-practice" },
            { label: "TETFund Project Maintenance", to: "/tetfund/annual-intervention/project-maintenance" }
          ]
        },
        {
          label: "Special Intervention",
          to: "/tetfund/special-intervention",
          children: [
            { label: "Disaster Recovery", to: "/tetfund/special-intervention/disaster-recovery" },
            { label: "High Impact", to: "/tetfund/special-intervention/high-impact" },
            { label: "National Research Fund", to: "/tetfund/special-intervention/national-research-fund" },
            { label: "Zonal", to: "/tetfund/special-intervention/zonal" }
          ]
        },
        {
          label: "Stakeholders",
          to: "/tetfund/stakeholders",
          children: [
            { label: "Ministry of Education", to: "/tetfund/stakeholders/ministry-of-education" },
            { label: "TETFund", to: "/tetfund/stakeholders/tetfund" },
            { label: "NUC", to: "/tetfund/stakeholders/nuc" }
          ]
        }
      ]
    },
    {
      label: "Staff",
      to: "/staff",
      children: [
        { label: "Aper Forms", to: "/staff/aper-forms" },
        { label: "Documents", to: "/staff/documents" },
        { label: "Students’ Management Information System (SMIS)", to: "/staff/smis" },
        { label: "Webmail", to: "/staff/webmail" }
      ]
    },
    { label: "Contact Us", to: "/contact" }
  ];

  // User session navigation links
  const userNavLinks = user ? [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/updateprofile", label: "Profile" },
    { to: "/logout", label: "Logout" }
  ] : [
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" }
  ];

  // Recursive Desktop Submenu renderer
  const renderDesktopDropdown = (children) => {
    return (
      <ul className="dropdown-submenu-list">
        {children.map((child, idx) => {
          const hasChildren = child.children && child.children.length > 0;
          return (
            <li key={idx} className={`submenu-item ${hasChildren ? 'has-nested-dropdown' : ''}`}>
              <NavLink 
                to={hasChildren ? "#" : child.to} 
                className="submenu-link"
                onClick={(e) => {
                  if (hasChildren) e.preventDefault();
                }}
              >
                <span>{child.label}</span>
                {hasChildren && <span className="chevron-right">&#9656;</span>}
              </NavLink>
              {hasChildren && renderDesktopDropdown(child.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  // Recursive Mobile Accordion Component
  const MobileMenuItem = ({ item, depth = 0, closeMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleToggle = (e) => {
      if (hasChildren) {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else {
        closeMenu();
      }
    };

    return (
      <div className={`mobile-nav-item depth-${depth}`}>
        <div className="mobile-nav-link-wrapper">
          <NavLink
            to={hasChildren ? "#" : item.to}
            onClick={handleToggle}
            className={`mobile-link ${hasChildren ? 'has-children' : ''} ${isOpen ? 'active' : ''}`}
            style={{ paddingLeft: `${(depth * 1) + 1}rem` }}
          >
            <span>{item.label}</span>
            {hasChildren && (
              <span className="submenu-indicator">
                {isOpen ? '−' : '+'}
              </span>
            )}
          </NavLink>
        </div>
        {hasChildren && isOpen && (
          <div className="mobile-submenu">
            {item.children.map((child, idx) => (
              <MobileMenuItem
                key={idx}
                item={child}
                depth={depth + 1}
                closeMenu={closeMenu}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`navigation-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Utility Head Bar */}
      <div className="top-utility-bar">
        <div className="top-utility-container">
          <div className="top-left-section">
            <a href="mailto:ict@ysu.edu.ng" className="top-email-link">
              <svg className="email-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>ict@ysu.edu.ng</span>
            </a>

            <div className="latest-news-ticker">
              <span className="ticker-label">Latest News:</span>
              <div className="ticker-content-wrapper">
                <div className={`ticker-item ${fadeNews ? 'fade-in' : 'fade-out'}`}>
                  {newsItems[activeNewsIndex]}
                </div>
              </div>
            </div>
          </div>

          <div className="top-right-section">
            <div className="quick-links-dropdown">
              <button 
                className="quick-links-btn"
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                aria-label="Toggle Quick Links"
              >
                <span>Quick Links</span>
                <span className="chevron-down-mini">&#9662;</span>
              </button>
              {quickLinksOpen && (
                <ul className="quick-links-menu">
                  {quickLinks.map((item, idx) => (
                    <li key={idx} className="quick-link-item">
                      <a href={item.to} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Middle branding header section */}
      <div className="middle-branding-bar">
        <div className="middle-branding-container">
          <div className="nav-branding-info">
            <NavLink to="/" className="branding-logo-link">
              <img
                src="/images/logo.jpg"
                alt="YSU Crest"
                className="branding-logo-image"
              />
              <div className="branding-text-block">
                <h1 className="branding-title">YOBE STATE UNIVERSITY</h1>
                <p className="branding-subtitle">Damaturu-Nigeria</p>
              </div>
            </NavLink>
          </div>

          <div className="nav-search-section">
            <form role="search" method="get" className="nav-search-form" onSubmit={handleSearchSubmit}>
              <label htmlFor="branding-search-field">
                <span className="screen-reader-text">Search for:</span>
                <input 
                  id="branding-search-field"
                  type="search" 
                  className="nav-search-field" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  name="s" 
                  title="Search for:" 
                />
              </label>
              <input type="submit" className="nav-search-submit" value="Search" />
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Main Nav Container */}
      <div className="nav-container">
        {/* Scroll-Only Logo Section */}
        <div className="nav-logo-section">
          <NavLink to="/" className="logo-link">
            <img
              src="/images/logo.jpg"
              alt="YSU Logo Scrolled"
              className="nav-logo-image"
            />
            <div className="logo-text">
              <span className="logo-title">YOBE STATE UNIVERSITY</span>
              <span className="logo-subtitle">Damaturu-Nigeria</span>
            </div>
          </NavLink>
        </div>

        {isMobile ? (
          <div className="nav-mobile-buttons">
            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
            <button
              className="sidebar-toggle"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="nav-menu">
            <ul className="main-nav-links">
              {menuData.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <li key={idx} className={`desktop-menu-item ${hasChildren ? 'has-dropdown' : ''}`}>
                    <NavLink 
                      to={hasChildren ? "#" : item.to} 
                      className="nav-link"
                      onClick={(e) => {
                        if (hasChildren) e.preventDefault();
                      }}
                    >
                      <span className="nav-link-text">{item.label}</span>
                      {hasChildren && <span className="chevron-down">&#9662;</span>}
                    </NavLink>
                    {hasChildren && renderDesktopDropdown(item.children)}
                  </li>
                );
              })}
            </ul>
            <div className="user-nav-links">
              {userNavLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className="user-link">
                  <span className="nav-link-text">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {isMobile && (
          <div className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <button
              className="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="mobile-links">
              <div className="mobile-menu-title">Main Menu</div>
              {menuData.map((item, idx) => (
                <MobileMenuItem
                  key={idx}
                  item={item}
                  closeMenu={() => setMobileMenuOpen(false)}
                />
              ))}
              <div className="mobile-divider"></div>
              <div className="mobile-menu-title">Account</div>
              {userNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
