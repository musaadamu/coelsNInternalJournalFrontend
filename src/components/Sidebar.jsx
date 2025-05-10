import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Check if we're on a mobile device
const isMobile = () => window.innerWidth <= 768;

const Sidebar = ({ className, onClose }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(location.pathname);

    // Get user from localStorage if available
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Handle window resize for responsive behavior
    const handleResize = () => {
      setMobile(isMobile());
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  // Add class to body when sidebar is open on mobile
  useEffect(() => {
    if (mobile && className?.includes('open')) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [mobile, className]);

  // Check if user is admin
  const isAdmin = user && user.role === 'admin';

  // Apply animation delay to menu items
  const getMenuItemStyle = (index) => ({
    '--item-index': index
  });

  return (
    <div className={`sidebar ${className || ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-header-title">Menu</div>
          {mobile && (
            <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
          <li className="sidebar-menu-item" style={getMenuItemStyle(0)}>
            <Link
              to="/"
              className={`sidebar-menu-link ${activeLink === '/' ? 'active' : ''}`}
            >
              <i className="fas fa-home sidebar-icon"></i>
              <span>Home</span>
            </Link>
          </li>

          <li className="sidebar-menu-item" style={getMenuItemStyle(1)}>
            <Link
              to="/journals"
              className={`sidebar-menu-link ${activeLink.includes('/journals') ? 'active' : ''}`}
            >
              <i className="fas fa-book-open sidebar-icon"></i>
              <span>Journals</span>
            </Link>
          </li>

          <li className="sidebar-menu-item" style={getMenuItemStyle(2)}>
            <Link
              to="/about"
              className={`sidebar-menu-link ${activeLink === '/about' ? 'active' : ''}`}
            >
              <i className="fas fa-info-circle sidebar-icon"></i>
              <span>About</span>
            </Link>
          </li>

          <li className="sidebar-menu-item" style={getMenuItemStyle(3)}>
            <Link
              to="/guide"
              className={`sidebar-menu-link ${activeLink === '/guide' ? 'active' : ''}`}
            >
              <i className="fas fa-question-circle sidebar-icon"></i>
              <span>Author Guide</span>
            </Link>
          </li>

          <li className="sidebar-menu-item" style={getMenuItemStyle(4)}>
            <Link
              to="/contact"
              className={`sidebar-menu-link ${activeLink === '/contact' ? 'active' : ''}`}
            >
              <i className="fas fa-envelope sidebar-icon"></i>
              <span>Contact</span>
            </Link>
          </li>

          {/* Admin-only menu items */}
          {isAdmin && (
            <>
              <li className="sidebar-menu-divider">
                Admin
                <div className="divider-line"></div>
              </li>
              <li className="sidebar-menu-item" style={getMenuItemStyle(5)}>
                <Link
                  to="/manage-journals"
                  className={`sidebar-menu-link ${activeLink === '/manage-journals' ? 'active' : ''}`}
                >
                  <i className="fas fa-tasks sidebar-icon"></i>
                  <span>Manage Journals</span>
                </Link>
              </li>
              <li className="sidebar-menu-item" style={getMenuItemStyle(6)}>
                <Link
                  to="/journals/uploads"
                  className={`sidebar-menu-link ${activeLink === '/journals/uploads' ? 'active' : ''}`}
                >
                  <i className="fas fa-upload sidebar-icon"></i>
                  <span>Upload Journals</span>
                </Link>
              </li>
            </>
          )}

          {/* User menu items */}
          {user ? (
            <>
              <li className="sidebar-menu-divider">
                Account
                <div className="divider-line"></div>
              </li>
              <li className="sidebar-menu-item" style={getMenuItemStyle(isAdmin ? 7 : 5)}>
                <Link
                  to="/dashboard"
                  className={`sidebar-menu-link ${activeLink === '/dashboard' ? 'active' : ''}`}
                >
                  <i className="fas fa-tachometer-alt sidebar-icon"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-menu-item" style={getMenuItemStyle(isAdmin ? 8 : 6)}>
                <Link
                  to="/logout"
                  className="sidebar-menu-link"
                >
                  <i className="fas fa-sign-out-alt sidebar-icon"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="sidebar-menu-divider">
                Account
                <div className="divider-line"></div>
              </li>
              <li className="sidebar-menu-item" style={getMenuItemStyle(5)}>
                <Link
                  to="/login"
                  className={`sidebar-menu-link ${activeLink === '/login' ? 'active' : ''}`}
                >
                  <i className="fas fa-sign-in-alt sidebar-icon"></i>
                  <span>Login</span>
                </Link>
              </li>
              <li className="sidebar-menu-item" style={getMenuItemStyle(6)}>
                <Link
                  to="/register"
                  className={`sidebar-menu-link ${activeLink === '/register' ? 'active' : ''}`}
                >
                  <i className="fas fa-user-plus sidebar-icon"></i>
                  <span>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>&copy; {new Date().getFullYear()} COELSN Journal</p>
      </div>
      </div>

      <div className="sidebar-branding">
        <Link to="/" className="sidebar-logo">
          <img src="/images/logo.jpg" alt="COELSN Journal Logo" className="sidebar-logo-img" />
          <div className="sidebar-title-container">
            <h2 className="sidebar-title">COELSN Journal</h2>
            <p className="sidebar-subtitle">Interdisciplinary Academic Research</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;