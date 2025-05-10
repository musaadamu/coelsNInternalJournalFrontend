import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>COELSN Journal of Interdisciplinary Academic Research and Development</h1>
        <p className="subtitle">Advancing Research Across Multiple Disciplines</p>
      </div>

      <section className="about-section">
        <div className="vision-mission">
          <div className="vision">
            <h3>Vision</h3>
            <p>To be a leading international journal fostering innovative interdisciplinary research and promoting academic excellence across diverse fields of study worldwide.</p>
          </div>
          <div className="mission">
            <h3>Mission</h3>
            <p>To publish high-quality, peer-reviewed research that contributes to the advancement of knowledge across multiple disciplines, encouraging collaboration between different fields and methodological approaches.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About the Journal</h2>
        <div className="institution-content">
          <div>
            <p>COELSN Journal of Interdisciplinary Academic Research and Development (CJIARD) is a peer-reviewed academic journal that publishes original research across multiple disciplines including social sciences, natural sciences, humanities, technology, and professional fields.</p>
            <p>Our editorial board comprises distinguished scholars from various universities and research institutions worldwide, ensuring high academic standards and diverse perspectives that reflect the interdisciplinary nature of our publication.</p>
          </div>
          <div className="contact-details">
            <h3>Contact Information</h3>
            <p>Location: Jos, Plateau State, Nigeria</p>
            <p>Email: contact@coelsn-journal.org</p>
            <p>Phone: +234 8138614901</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Journal Details</h2>
        <div className="journal-details">
          <div className="detail-card">
            <h3>Publication Frequency</h3>
            <p>Quarterly (4 issues per year)</p>
          </div>
          <div className="detail-card">
            <h3>Peer Review Process</h3>
            <p>Double-blind peer review</p>
          </div>
          <div className="detail-card">
            <h3>Open Access</h3>
            <p>Full open access with online publication</p>
          </div>
          <div className="detail-card">
            <h3>Scope</h3>
            <p>Interdisciplinary research across multiple academic fields</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Research Areas</h2>
        <div className="journal-details">
          <div className="detail-card">
            <h3>Social Sciences</h3>
            <p>Education, Psychology, Sociology, Economics, Political Science</p>
          </div>
          <div className="detail-card">
            <h3>Natural Sciences</h3>
            <p>Biology, Chemistry, Physics, Environmental Science</p>
          </div>
          <div className="detail-card">
            <h3>Technology & Innovation</h3>
            <p>Computer Science, Engineering, Information Technology</p>
          </div>
          <div className="detail-card">
            <h3>Humanities & Arts</h3>
            <p>Literature, History, Philosophy, Cultural Studies</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Location</h2>
        <div className="location-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.953833312434!2d8.893775!3d9.940899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105373796bdf3c7d%3A0xc80483ad534b0117!2sUniversity%20of%20Jos!5e0!3m2!1sen!2sng!4v1701876008045!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="University of Jos Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
