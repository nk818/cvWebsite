import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const titles = ['Computer Science Student', 'Problem Solver', 'Tech Enthusiast', 'Developer'];
    
    const handleType = () => {
      const current = loopNum % titles.length;
      const fullText = titles[current];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Noah Kueng</span>
            </h1>
            <h2 className="hero-subtitle">
              I'm a <span className="typewriter">{text}</span>
              <span className="cursor">|</span>
            </h2>
            <p className="hero-description">
              Computer Science undergraduate student at Texas Tech University.
              Passionate about programming, problem-solving, and creating innovative solutions.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                <i className="fas fa-rocket"></i>
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                <i className="fas fa-envelope"></i>
                Contact Me
              </button>
            </div>
            <div className="hero-social">
              <a href="https://kovuapp.com/" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-mobile-alt"></i>
              </a>
              <a href="mailto:noah.kueng.1@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="tel:+18062831175" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src={`${process.env.PUBLIC_URL}/profile-picture.jpg`} alt="Noah Kueng Profile" />
              <div className="image-decoration"></div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-arrow" onClick={() => scrollToSection('about')}>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
