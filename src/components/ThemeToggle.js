import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ darkMode, isVisible, onToggle }) => {
  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : ''} ${isVisible ? 'active' : ''}`}
      onClick={onToggle}
      aria-label="Toggle theme controller"
      title="Open AI Theme Controller"
    >
      <div className="theme-toggle-icon">
        <div className="palette-icon">
          <div className="color-dot color-1"></div>
          <div className="color-dot color-2"></div>
          <div className="color-dot color-3"></div>
          <div className="color-dot color-4"></div>
        </div>
        <div className="brush-icon">🎨</div>
      </div>
      <span className="theme-toggle-text">AI Theme</span>
    </button>
  );
};

export default ThemeToggle;
