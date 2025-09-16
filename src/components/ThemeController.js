import React, { useState, useEffect } from 'react';
import useThemeManager from '../hooks/useThemeManager';
import './ThemeController.css';

const ThemeController = ({ darkMode, isVisible, onToggleVisibility }) => {
  const {
    isLoading,
    error,
    currentTheme,
    themeHistory,
    isConnected,
    requestThemeChange,
    applyThemeChanges,
    resetTheme,
    getThemeSuggestions,
    testConnection,
    clearError
  } = useThemeManager();

  const [themeRequest, setThemeRequest] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customChanges, setCustomChanges] = useState({});
  const [requestHistory, setRequestHistory] = useState([]);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  // Handle theme request submission
  const handleThemeRequest = async (e) => {
    e.preventDefault();
    if (!themeRequest.trim()) return;

    const result = await requestThemeChange(themeRequest);
    
    if (result.success) {
      setRequestHistory(prev => [
        { request: themeRequest, timestamp: Date.now(), success: true },
        ...prev.slice(0, 9) // Keep last 10 requests
      ]);
      setThemeRequest('');
    }
  };

  // Get AI suggestions
  const handleGetSuggestions = async () => {
    const content = `CV Website - Current sections: Hero, About, Experience, Skills, Projects, Education, Contact. Current theme: ${JSON.stringify(currentTheme)}`;
    const result = await getThemeSuggestions(content);
    if (result) {
      setSuggestions(result.suggestions || []);
    }
  };

  // Apply suggestion
  const handleApplySuggestion = async (suggestion) => {
    const result = await requestThemeChange(suggestion);
    if (result.success) {
      setSuggestions(prev => prev.filter(s => s !== suggestion));
    }
  };

  // Handle custom theme changes
  const handleCustomChange = (property, value) => {
    setCustomChanges(prev => ({
      ...prev,
      [property]: value
    }));
  };

  // Apply custom changes
  const handleApplyCustomChanges = () => {
    const result = applyThemeChanges(customChanges);
    if (result.success) {
      setCustomChanges({});
    }
  };

  // Quick theme presets
  const quickThemes = [
    { name: 'Ocean', request: 'Create an ocean-themed color scheme with blues and teals' },
    { name: 'Sunset', request: 'Create a warm sunset theme with oranges and purples' },
    { name: 'Forest', request: 'Create a nature-inspired forest theme with greens and browns' },
    { name: 'Minimal', request: 'Create a clean minimal theme with grays and whites' },
    { name: 'Vibrant', request: 'Create a vibrant energetic theme with bright colors' },
    { name: 'Dark', request: 'Create a modern dark theme with dark backgrounds' }
  ];

  return (
    <div className={`theme-controller ${isVisible ? 'visible' : 'minimized'} ${darkMode ? 'dark' : ''}`}>
      <div className="theme-header">
        <h3>🎨 AI Theme Controller</h3>
        <div className="connection-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          <button 
            onClick={testConnection}
            className="btn btn-small"
            disabled={isLoading}
            title="Test backend connection"
          >
            {isLoading ? '⏳' : '🔍'}
          </button>
        </div>
        <button 
          className="toggle-visibility"
          onClick={onToggleVisibility}
          aria-label="Toggle theme controller"
        >
          {isVisible ? '−' : '+'}
        </button>
      </div>

      {isVisible && (
        <div className="theme-content">
          {error && (
            <div className="error-message">
              <span>{error}</span>
              <button onClick={clearError}>×</button>
            </div>
          )}

          {/* AI Theme Request */}
          <div className="theme-request-section">
            <h4>🤖 AI Theme Request</h4>
            <form onSubmit={handleThemeRequest} className="theme-form">
              <textarea
                value={themeRequest}
                onChange={(e) => setThemeRequest(e.target.value)}
                placeholder="Describe your desired theme... (e.g., 'Make it look like a cyberpunk interface' or 'Use warm autumn colors')"
                className="theme-textarea"
                rows="3"
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading || !themeRequest.trim()}
              >
                {isLoading ? '🔄 Generating...' : '✨ Generate Theme'}
              </button>
            </form>
          </div>

          {/* Quick Themes */}
          <div className="quick-themes-section">
            <h4>⚡ Quick Themes</h4>
            <div className="quick-themes-grid">
              {quickThemes.map((theme, index) => (
                <button
                  key={index}
                  className="quick-theme-btn"
                  onClick={() => setThemeRequest(theme.request)}
                  disabled={isLoading}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="suggestions-section">
            <div className="suggestions-header">
              <h4>💡 AI Suggestions</h4>
              <button 
                onClick={handleGetSuggestions}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                {isLoading ? '🔄' : '🎯 Get Suggestions'}
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item">
                    <span>{suggestion}</span>
                    <button 
                      onClick={() => handleApplySuggestion(suggestion)}
                      className="apply-suggestion-btn"
                      disabled={isLoading}
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Controls */}
          <div className="advanced-section">
            <button 
              className="toggle-advanced"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? '▼' : '▶'} Advanced Controls
            </button>
            
            {showAdvanced && (
              <div className="advanced-controls">
                {/* Custom Theme Changes */}
                <div className="custom-changes">
                  <h5>Custom Theme Changes</h5>
                  <div className="custom-inputs">
                    {Object.entries(currentTheme).map(([key, value]) => (
                      <div key={key} className="custom-input-group">
                        <label>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</label>
                        <input
                          type="text"
                          value={customChanges[key] || ''}
                          onChange={(e) => handleCustomChange(key, e.target.value)}
                          placeholder={value}
                        />
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={handleApplyCustomChanges}
                    className="btn btn-secondary"
                    disabled={Object.keys(customChanges).length === 0}
                  >
                    Apply Custom Changes
                  </button>
                </div>

                {/* Theme History */}
                <div className="theme-history">
                  <h5>Theme History</h5>
                  <div className="history-list">
                    {themeHistory.slice(-5).map((theme, index) => (
                      <div key={index} className="history-item">
                        <span className="history-name">{theme.name}</span>
                        <span className="history-time">
                          {new Date(theme.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request History */}
                <div className="request-history">
                  <h5>Request History</h5>
                  <div className="request-list">
                    {requestHistory.slice(0, 5).map((req, index) => (
                      <div key={index} className="request-item">
                        <span className="request-text">{req.request}</span>
                        <span className={`request-status ${req.success ? 'success' : 'error'}`}>
                          {req.success ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <button 
                  onClick={resetTheme}
                  className="btn btn-danger"
                >
                  🔄 Reset to Initial Theme
                </button>
              </div>
            )}
          </div>

          {/* Current Theme Display */}
          <div className="current-theme-section">
            <h4>🎨 Current Theme</h4>
            <div className="theme-preview">
              <div className="color-palette">
                {Object.entries(currentTheme).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="color-item">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: value }}
                    ></div>
                    <span className="color-name">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeController;
