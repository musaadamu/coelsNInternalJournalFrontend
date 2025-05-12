import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList.jsx";
// import JournalHero from "../components/JournalHero.jsx";
import './Home.css';
import ImprovedCarousel from "../components/Carousol.jsx";
// Bootstrap CSS is now imported globally

// No need to import CarouselImages anymore

export default function HomePage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Define carousel images with multiple fallback options
    const carouselImages = [
        {
            src: "/images/image1.JPG",
            fallbackSrc: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
            alt: "COELSN Journal",
            title: "Advancing Academic Excellence",
            description: "Promoting innovative research across disciplines"
        },
        {
            src: "/images/image10.JPG",
            fallbackSrc: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80",
            alt: "Academic Research",
            title: "Interdisciplinary Collaboration",
            description: "Connecting researchers across academic boundaries"
        },
        {
            // Try multiple variations of the filename
            src: "/images/image14.jpg", // Try lowercase extension
            fallbackSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
            alt: "Research Development",
            title: "Global Research Impact",
            description: "Publishing research that shapes our understanding of the world"
        }
    ];

    return (
        <div className="home-container">
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <div className="main-container">
                    <main className="main-content">
                        {/* Journal Title */}
                        <div className="journal-title-container">
                            <h1 className="journal-main-title">COELSN Journal of Interdisciplinary Academic Research and Development</h1>
                        </div>

                        {/* Carousel Caption Section */}
                        <div className="carousel-caption-container">
                            <div className="carousel-caption-box">
                                <h2>{carouselImages[activeIndex].title}</h2>
                                <p>{carouselImages[activeIndex].description}</p>
                            </div>
                        </div>

                        {/* Carousel Section */}
                        <div className="home-carousel-wrapper">
                            <ImprovedCarousel
                                images={carouselImages}
                                height={isMobile ? 300 : 500}
                                autoplaySpeed={4000}
                                showTitle={false}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        </div>

                        {/* <JournalHero /> */}

                        {/* Welcome Section - Modern Design */}
                        <div className="modern-welcome-container">
                            <div className="welcome-left">
                                <motion.h2
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="welcome-heading"
                                >
                                    Welcome to the <span className="highlight">COELSN Journal</span>
                                </motion.h2>
                                <motion.h3
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="welcome-subheading"
                                >
                                    of Interdisciplinary Academic Research and Development
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="welcome-text"
                                >
                                    A global platform for scholars, researchers, and academics to publish and discover cutting-edge interdisciplinary research across multiple fields.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="welcome-actions"
                                >
                                    <Link to="/submission" className="primary-button">
                                        Submit Your Manuscript
                                    </Link>
                                    <Link to="/about" className="secondary-button">
                                        Learn More
                                    </Link>
                                </motion.div>
                            </div>
                            <motion.div
                                className="welcome-right"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="welcome-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">100+</span>
                                        <span className="stat-label">Published Articles</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">50+</span>
                                        <span className="stat-label">Expert Reviewers</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">12</span>
                                        <span className="stat-label">Research Fields</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">4</span>
                                        <span className="stat-label">Issues Per Year</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Featured Articles Section */}
                        <div className="featured-articles-background">
                            <section className="featured-section">
                                <h2 className="featured-title">Featured Articles</h2>
                                <JournalList />
                                <div className="view-all-link">
                                    <Link
                                        to="/journals"
                                        className="view-all-button"
                                    >
                                        View All Articles →
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}