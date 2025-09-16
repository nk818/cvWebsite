import React, { useEffect, useRef, useState, useCallback } from 'react';
import useHandGestures from '../hooks/useHandGestures';
import { checkSystemStatus, testGestureSystem } from '../utils/gestureTest';
import './GestureController.css';

const GestureController = ({ darkMode, toggleDarkMode, onClose }) => {
  const {
    videoRef,
    canvasRef,
    gestureData,
    isInitialized,
    isDetecting,
    startCamera,
    stopCamera,
    toggleDetection
  } = useHandGestures();

  const [isVisible, setIsVisible] = useState(true);
  const [lastGesture, setLastGesture] = useState(null);
  const [gestureHistory, setGestureHistory] = useState([]);
  const gestureTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  // Define navigateToSection first so it's available to handlers
  const navigateToSection = (sectionName) => {
    console.log('Navigating to section:', sectionName);
    const element = document.querySelector(`#${sectionName}`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Navigation successful to:', sectionName);
    } else {
      console.log('Section not found:', sectionName);
    }
  };

  // Gesture handler functions - each maps to a specific section
  const handlePointGesture = useCallback((gesture) => {
    console.log('Point gesture - navigating to Hero section');
    navigateToSection('hero');
  }, []);

  const handlePeaceGesture = useCallback((gesture) => {
    console.log('Peace gesture - navigating to About section');
    navigateToSection('about');
  }, []);


  const handleFistGesture = useCallback((gesture) => {
    console.log('Fist gesture - navigating to Experience section');
    navigateToSection('experience');
  }, []);

  const handleThumbsUpGesture = useCallback((gesture) => {
    console.log('Thumbs up gesture - navigating to Skills section');
    navigateToSection('skills');
  }, []);

  const handleVictoryGesture = useCallback((gesture) => {
    console.log('Victory gesture - navigating to Projects section');
    navigateToSection('projects');
  }, []);

  const handleOkSignGesture = useCallback((gesture) => {
    console.log('OK sign gesture - navigating to Education section');
    navigateToSection('education');
  }, []);

  const handleRockOnGesture = useCallback((gesture) => {
    console.log('Rock on gesture - navigating to Contact section');
    navigateToSection('contact');
  }, []);

  const handleOpenHandGesture = useCallback((gesture) => {
    console.log('Open hand gesture - toggling dark mode');
    // Add delay to prevent rapid toggling
    if (!clickTimeoutRef.current) {
      toggleDarkMode();
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
      }, 1000); // 1 second delay before allowing another toggle
    } else {
      console.log('Dark mode toggle blocked - too soon after last toggle');
      // Visual feedback that toggle is blocked
      const controller = document.querySelector('.gesture-controller');
      if (controller) {
        controller.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        setTimeout(() => {
          controller.style.backgroundColor = '';
        }, 200);
      }
    }
  }, [toggleDarkMode]);

  // Immediate gesture execution - no delays
  const executeGestureAction = useCallback((gesture) => {
    if (!gesture || gesture.confidence < 0.9) {
      console.log('Gesture rejected - low confidence:', gesture?.confidence);
      return;
    }

    const now = Date.now();
    const sameGesture = lastGesture?.gesture === gesture.gesture;
    const timeSinceLastGesture = now - (lastGesture?.timestamp || 0);

    // Moderate debounce - prevent exact same gesture within 300ms
    if (sameGesture && timeSinceLastGesture < 300) {
      console.log('Gesture ignored - too soon after last gesture');
      return;
    }

    console.log('Executing gesture action:', gesture.gesture, 'confidence:', gesture.confidence, 'position:', gesture.position);
    setLastGesture({ ...gesture, timestamp: now });
    setGestureHistory(prev => [...prev.slice(-4), { ...gesture, timestamp: now }]);

    // Add immediate feedback
    console.log('About to execute gesture:', gesture.gesture);
    
    // Visual feedback - flash the gesture controller
    const controller = document.querySelector('.gesture-controller');
    if (controller) {
      controller.style.backgroundColor = 'rgba(102, 126, 234, 0.3)';
      setTimeout(() => {
        controller.style.backgroundColor = '';
      }, 200);
    }
    
    switch (gesture.gesture) {
      case 'point':
        handlePointGesture(gesture);
        break;
      case 'peace':
        handlePeaceGesture(gesture);
        break;
      case 'open_hand':
        handleOpenHandGesture(gesture);
        break;
      case 'fist':
        handleFistGesture(gesture);
        break;
      case 'thumbs_up':
        handleThumbsUpGesture(gesture);
        break;
      case 'ok_sign':
        handleOkSignGesture(gesture);
        break;
      case 'rock_on':
        handleRockOnGesture(gesture);
        break;
      case 'victory':
        handleVictoryGesture(gesture);
        break;
      default:
        console.log('Unknown gesture:', gesture.gesture);
        break;
    }
  }, [lastGesture, handlePointGesture, handlePeaceGesture, handleOpenHandGesture, handleFistGesture, handleThumbsUpGesture, handleVictoryGesture, handleOkSignGesture, handleRockOnGesture]);

  // Removed duplicate function definitions - now defined above

  const getCurrentSection = () => {
    const sections = document.querySelectorAll('#hero, #about, #experience, #skills, #projects, #education, #contact');
    let currentSection = 'hero';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section.id || 'hero';
      }
    });
    
    console.log('Current section:', currentSection);
    return currentSection;
  };

  const getElementAtPosition = (position) => {
    const x = position.x * window.innerWidth;
    const y = position.y * window.innerHeight;
    return document.elementFromPoint(x, y);
  };

  useEffect(() => {
    if (gestureData) {
      // Small delay for better user experience
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current);
      }
      
      gestureTimeoutRef.current = setTimeout(() => {
        executeGestureAction(gestureData);
      }, 50); // 50ms delay for smoother experience
    }

    return () => {
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current);
      }
    };
  }, [gestureData, executeGestureAction]);

  const handleStartCamera = async () => {
    try {
      await startCamera();
    } catch (error) {
      console.error('Failed to start camera:', error);
      alert('Failed to start camera. Please ensure you have granted camera permissions.');
    }
  };

  return (
    <div 
      className={`gesture-controller ${isVisible ? 'visible' : 'minimized'} ${darkMode ? 'dark' : ''}`}
      onClick={() => !isVisible && setIsVisible(true)}
      style={{ cursor: !isVisible ? 'pointer' : 'default' }}
    >
      <div className="gesture-header">
        <div className="gesture-title">
          <div className="gesture-icon">👋</div>
          <h3>Hand Gestures</h3>
        </div>
        {isVisible && (
          <button 
            className="toggle-visibility"
            onClick={(e) => {
              e.stopPropagation();
              onClose(); // Close window completely
            }}
            aria-label="Close gesture controller"
            title="Close gesture controls"
          >
            ×
          </button>
        )}
      </div>

      {isVisible && (
        <div className="gesture-content">
          <div className="camera-controls">
            {!isInitialized ? (
              <button onClick={handleStartCamera} className="start-button">
                <i className="fas fa-camera"></i>
                Start Camera
              </button>
            ) : (
              <div className="control-buttons">
                <button onClick={toggleDetection} className={isDetecting ? 'stop' : 'start'}>
                  <i className={`fas ${isDetecting ? 'fa-pause' : 'fa-play'}`}></i>
                  {isDetecting ? 'Pause' : 'Resume'}
                </button>
                <button onClick={stopCamera} className="stop">
                  <i className="fas fa-stop"></i>
                  Stop
                </button>
              </div>
            )}
          </div>

          <div className="video-container">
            <video ref={videoRef} className="video-feed" autoPlay playsInline muted />
            <canvas ref={canvasRef} className="gesture-overlay" />
          </div>

          <div className="gesture-info">
            {gestureData && (
              <div className="current-gesture">
                <span className="gesture-name">{gestureData.gesture.replace('_', ' ')}</span>
                <span className="confidence">{Math.round(gestureData.confidence * 100)}%</span>
                <div className="gesture-position">
                  Position: ({Math.round(gestureData.position.x * 100)}%, {Math.round(gestureData.position.y * 100)}%)
                </div>
                <div className="gesture-status">✅ Stabilized</div>
              </div>
            )}
            
            {!gestureData && isDetecting && (
              <div className="detection-status">
                <div className="detection-indicator">
                  <div className="pulse-dot"></div>
                  <span>Detecting gestures...</span>
                </div>
              </div>
            )}
            
            {gestureHistory.length > 0 && (
              <div className="gesture-history">
                <h4>Recent Gestures:</h4>
                <div className="history-list">
                  {gestureHistory.slice(-3).map((gesture, index) => (
                    <div key={index} className="history-item">
                      {gesture.gesture} ({Math.round(gesture.confidence * 100)}%)
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="gesture-guide">
              <h4>Gesture Controls:</h4>
              <ul>
                <li><strong>Point (👆):</strong> Go to Home</li>
                <li><strong>Peace (✌️):</strong> Go to About</li>
                <li><strong>Fist (✊):</strong> Go to Experience</li>
                <li><strong>Thumbs Up (👍):</strong> Go to Skills</li>
                <li><strong>Victory (✌️):</strong> Go to Projects</li>
                <li><strong>OK Sign (👌):</strong> Go to Education</li>
                <li><strong>Rock On (🤘):</strong> Go to Contact</li>
                <li><strong>Open Hand (🖐️):</strong> Toggle Dark Mode</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestureController;
