import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import GestureController from './components/GestureController';
import ThemeController from './components/ThemeController';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showThemeController, setShowThemeController] = useState(false);
  const [showGestures, setShowGestures] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🎨",
      title: "AI-Powered Theme System",
      description: "Change the entire look and feel using natural language!",
      details: ["🎨 Natural language requests", "⚡ Quick theme presets", "💡 AI suggestions", "🔄 Real-time changes"]
    },
    {
      icon: "👋",
      title: "Hand Gesture Controls",
      description: "Control the website using hand gestures!",
      details: ["👆 Point - Navigate sections", "✌️ Peace - Quick nav", "✊ Fist - Toggle dark mode", "👍 Thumbs up - Show controls"]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased to 4 seconds to show both features

    // Cycle through features during loading
    const featureInterval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(featureInterval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleThemeController = () => {
    setShowThemeController(!showThemeController);
  };

  const toggleGestures = () => {
    setShowGestures(!showGestures);
  };


  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading...</h2>
          
          <div className="feature-showcase">
            <div className="feature-card">
              <div className="feature-icon">{features[currentFeature].icon}</div>
              <h3 className="feature-title">{features[currentFeature].title}</h3>
              <p className="feature-description">{features[currentFeature].description}</p>
              <div className="feature-details">
                {features[currentFeature].details.map((detail, index) => (
                  <span key={index} className="feature-detail">{detail}</span>
                ))}
              </div>
            </div>
            
            <div className="feature-indicators">
              {features.map((_, index) => (
                <div 
                  key={index} 
                  className={`indicator ${index === currentFeature ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        onToggleGestures={toggleGestures}
        isGestureVisible={showGestures}
      />
      <ThemeToggle 
        darkMode={darkMode}
        isVisible={showThemeController}
        onToggle={toggleThemeController}
      />
      {showGestures && (
        <GestureController 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onClose={toggleGestures}
        />
      )}
      <ThemeController 
        darkMode={darkMode}
        isVisible={showThemeController}
        onToggleVisibility={toggleThemeController}
      />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </div>
  );
}

export default App;