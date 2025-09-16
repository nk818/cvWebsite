import { useState, useEffect, useCallback, useRef } from 'react';
import ThemeAPI from '../services/themeAPI';

const useThemeManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTheme, setCurrentTheme] = useState({});
  const [themeHistory, setThemeHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const themeAPI = useRef(new ThemeAPI());
  const reconnectTimeoutRef = useRef(null);

  // Initialize theme manager
  useEffect(() => {
    const initializeTheme = () => {
      const initialTheme = themeAPI.current.getCurrentTheme();
      setCurrentTheme(initialTheme);
      setThemeHistory([{ ...initialTheme, timestamp: Date.now(), name: 'Initial Theme' }]);
    };

    initializeTheme();

    // Listen for theme changes from other sources
    const handleThemeChange = (event) => {
      const { themeChanges } = event.detail;
      setCurrentTheme(prev => ({ ...prev, ...themeChanges }));
    };

    window.addEventListener('themeChanged', handleThemeChange);
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Test backend connection
  const testConnection = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use the testConnection method from ThemeAPI
      const connected = await themeAPI.current.testConnection();
      setIsConnected(connected);
      
      if (!connected) {
        setError('Backend connection failed. Please check your API configuration.');
      }
      
      return connected;
    } catch (error) {
      console.error('Connection test failed:', error);
      setError('Backend connection failed. Please check your API configuration.');
      setIsConnected(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Request theme change from AI
  const requestThemeChange = useCallback(async (themeRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      // Test connection first
      const connected = await testConnection();
      if (!connected) {
        throw new Error('Backend not available');
      }

      // Send request to AI
      const response = await themeAPI.current.requestThemeChange(themeRequest);
      
      if (response.success && response.themeChanges) {
        // Validate and apply theme changes
        const validatedChanges = themeAPI.current.validateThemeChanges(response.themeChanges);
        themeAPI.current.applyThemeChanges(validatedChanges);
        
        // Update state
        const newTheme = { ...currentTheme, ...validatedChanges };
        setCurrentTheme(newTheme);
        
        // Add to history
        setThemeHistory(prev => [
          ...prev.slice(-9), // Keep last 10 themes
          { 
            ...newTheme, 
            timestamp: Date.now(), 
            name: response.themeName || 'AI Generated Theme',
            request: themeRequest
          }
        ]);

        return {
          success: true,
          themeChanges: validatedChanges,
          message: response.message || 'Theme updated successfully!'
        };
      } else {
        throw new Error(response.message || 'Failed to generate theme changes');
      }
    } catch (error) {
      console.error('Theme change request failed:', error);
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setIsLoading(false);
    }
  }, [currentTheme, testConnection]);

  // Apply theme changes directly (for manual overrides)
  const applyThemeChanges = useCallback((changes) => {
    try {
      const validatedChanges = themeAPI.current.validateThemeChanges(changes);
      themeAPI.current.applyThemeChanges(validatedChanges);
      
      const newTheme = { ...currentTheme, ...validatedChanges };
      setCurrentTheme(newTheme);
      
      setThemeHistory(prev => [
        ...prev.slice(-9),
        { 
          ...newTheme, 
          timestamp: Date.now(), 
          name: 'Manual Override'
        }
      ]);

      return { success: true, changes: validatedChanges };
    } catch (error) {
      console.error('Failed to apply theme changes:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [currentTheme]);

  // Reset to initial theme
  const resetTheme = useCallback(() => {
    const initialTheme = themeAPI.current.getCurrentTheme();
    setCurrentTheme(initialTheme);
    setThemeHistory(prev => [
      ...prev.slice(-9),
      { 
        ...initialTheme, 
        timestamp: Date.now(), 
        name: 'Reset to Initial'
      }
    ]);
  }, []);

  // Get theme suggestions
  const getThemeSuggestions = useCallback(async (content = '') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const suggestions = await themeAPI.current.getThemeSuggestions(content);
      return suggestions;
    } catch (error) {
      console.error('Failed to get theme suggestions:', error);
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save current theme as preset
  const saveThemePreset = useCallback(async (presetName) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await themeAPI.current.saveThemePreset(presetName, currentTheme);
      return result;
    } catch (error) {
      console.error('Failed to save theme preset:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [currentTheme]);

  // Load theme preset
  const loadThemePreset = useCallback(async (presetId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const themeData = await themeAPI.current.loadThemePreset(presetId);
      const validatedChanges = themeAPI.current.validateThemeChanges(themeData);
      themeAPI.current.applyThemeChanges(validatedChanges);
      
      const newTheme = { ...currentTheme, ...validatedChanges };
      setCurrentTheme(newTheme);
      
      setThemeHistory(prev => [
        ...prev.slice(-9),
        { 
          ...newTheme, 
          timestamp: Date.now(), 
          name: `Preset: ${presetId}`
        }
      ]);

      return { success: true, theme: newTheme };
    } catch (error) {
      console.error('Failed to load theme preset:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [currentTheme]);

  // Auto-reconnect functionality
  const enableAutoReconnect = useCallback(() => {
    const attemptReconnect = () => {
      testConnection().then(connected => {
        if (!connected) {
          reconnectTimeoutRef.current = setTimeout(attemptReconnect, 5000);
        }
      });
    };
    
    attemptReconnect();
  }, [testConnection]);

  return {
    // State
    isLoading,
    error,
    currentTheme,
    themeHistory,
    isConnected,
    
    // Actions
    requestThemeChange,
    applyThemeChanges,
    resetTheme,
    getThemeSuggestions,
    saveThemePreset,
    loadThemePreset,
    testConnection,
    enableAutoReconnect,
    
    // Utilities
    clearError: () => setError(null),
  };
};

export default useThemeManager;
