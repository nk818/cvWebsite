import React, { useState, useEffect } from 'react';
import './WelcomePopup.css';

const WelcomePopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "🎉 Welcome to My Interactive CV!",
      content: "This website features two amazing interactive systems that make browsing more engaging and fun!",
      icon: "👋"
    },
    {
      title: "🤖 AI-Powered Theme System",
      content: "Change the entire look and feel of the website using natural language! Just describe what you want and watch the AI transform the design.",
      features: [
        "🎨 Natural language theme requests",
        "⚡ Quick theme presets",
        "💡 AI-generated suggestions",
        "🔄 Real-time theme changes"
      ],
      icon: "🎨"
    },
    {
      title: "👋 Hand Gesture Controls",
      content: "Control the website using hand gestures! No clicking required - just wave your hand in front of the camera.",
      features: [
        "👆 Point - Navigate to sections",
        "✌️ Peace - Quick navigation",
        "✊ Fist - Toggle dark mode",
        "👍 Thumbs up - Show controls",
        "🤘 Rock on - Go to top"
      ],
      icon: "👋"
    },
    {
      title: "🚀 How to Get Started",
      content: "Ready to explore? Here's how to use both features:",
      features: [
        "1. Click the 🎨 button for theme controls",
        "2. Click the 👋 button for gesture controls",
        "3. Try making gestures in front of your camera",
        "4. Ask the AI to change themes with natural language!"
      ],
      icon: "🚀"
    }
  ];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  useEffect(() => {
    console.log('WelcomePopup useEffect triggered');
    // Show popup with animation
    const timer = setTimeout(() => {
      console.log('Setting popup visible to true');
      setIsVisible(true);
    }, 100);

    // Auto-advance slides every 1.5 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 1500);

    // Auto-hide after 6 seconds (4 slides × 1.5 seconds)
    const autoHideTimer = setTimeout(() => {
      handleClose();
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoHideTimer);
      clearInterval(slideInterval);
    };
  }, [handleClose, slides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`welcome-popup-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="welcome-popup">
        <div className="popup-header">
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="popup-content">
          <div className="slide-container">
            <div 
              className="slides-wrapper"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slide">
                  <div className="slide-icon">{slide.icon}</div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-content">{slide.content}</p>
                  
                  {slide.features && (
                    <div className="slide-features">
                      {slide.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="feature-item">
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="popup-controls">
            <button 
              className="nav-btn prev-btn" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ← Previous
            </button>
            
            <div className="slide-counter">
              {currentSlide + 1} of {slides.length}
            </div>
            
            <button 
              className="nav-btn next-btn" 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              Next →
            </button>
          </div>
        </div>

        <div className="popup-footer">
          <div className="auto-close-timer">
            <div className="timer-bar">
              <div className="timer-progress"></div>
            </div>
            <span>Auto-closes in 6 seconds</span>
          </div>
          
          <button className="get-started-btn" onClick={handleClose}>
            Let's Get Started! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
