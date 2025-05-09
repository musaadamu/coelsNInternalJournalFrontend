import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImprovedCarousel.css';

export default function ImprovedCarousel({
  images = [],
  autoplaySpeed = 5000,
  title = "Sahara International Journal of Teacher Education"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageStatus, setImageStatus] = useState({});

  // Process images to ensure they have all required properties
  const processedImages = images.map((image, index) => {
    // Ensure image src has the correct path
    let src = image.src || '';

    // Include the fallbackSrc if provided
    return {
      src: src,
      fallbackSrc: image.fallbackSrc || '',
      alt: image.alt || `Slide ${index + 1}`,
      title: image.title || '',
      description: image.description || ''
    };
  });

  // Handle image loading
  const handleImageLoad = (index) => {
    setImageStatus(prev => ({
      ...prev,
      [index]: 'loaded'
    }));
  };

  // Handle image error
  const handleImageError = (index) => {
    setImageStatus(prev => ({
      ...prev,
      [index]: 'error'
    }));
  };

  // Navigation functions
  const nextSlide = () => {
    setActiveIndex((current) =>
      current === processedImages.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? processedImages.length - 1 : current - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    if (autoplaySpeed <= 0) return;

    const interval = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplaySpeed]);

  // If no images provided, show placeholder
  if (processedImages.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-image-container">
          <div className="carousel-main-title">
            <h1>{title}</h1>
          </div>
          <div className="flex items-center justify-center h-full">
            <p className="text-white">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      {/* Main title at the top */}
      <div className="carousel-main-title">
        <h1>{title}</h1>
      </div>

      <div className="carousel-inner-container">
        {/* Image container on the left */}
        <div className="carousel-image-container">
          {processedImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === activeIndex ? "active" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="carousel-image"
                onLoad={() => handleImageLoad(index)}
                onError={(e) => {
                  console.error(`Failed to load image: ${image.src}`);
                  // Use the provided fallback or a default fallback
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = image.fallbackSrc || "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=800&q=60";
                  handleImageError(index);
                }}
              />

              {imageStatus[index] === 'error' && (
                <div className="carousel-error-overlay">
                  <div className="carousel-error-content">
                    <p className="carousel-error-title">{image.title}</p>
                    <p className="carousel-error-description">{image.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Navigation buttons */}
          <button
            className="carousel-nav-button prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="carousel-nav-button next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Content container on the right */}
        <div className="carousel-content">
          <div className="carousel-caption">
            <h2 className="carousel-caption-title">
              {processedImages[activeIndex].title}
            </h2>
            <p className="carousel-caption-text">
              {processedImages[activeIndex].description}
            </p>

            {/* Call-to-action button */}
            <button className="carousel-cta-button">
              Learn More
            </button>
          </div>

          {/* Indicator dots */}
          <div className="carousel-dots">
            {processedImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}