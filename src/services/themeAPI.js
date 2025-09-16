// Theme API Service for Firebase AI Communication
class ThemeAPI {
  constructor(baseURL = 'https://us-central1-kovuapp-fda51.cloudfunctions.net') {
    this.baseURL = baseURL;
    this.apiKey = null; // No authentication needed
  }

  // Test backend connectivity
  async testConnection() {
    console.log('🔍 Testing backend connectivity...');
    console.log('Backend URL:', this.baseURL);
    console.log('Full URL:', `${this.baseURL}/generate_theme`);
    
    // Test 0: Basic network connectivity
    try {
      console.log('🌐 Testing basic network connectivity...');
      const basicResponse = await fetch(this.baseURL, {
        method: 'GET',
        mode: 'no-cors' // This will work even if CORS is not configured
      });
      console.log('🌐 Basic connectivity test completed');
    } catch (error) {
      console.error('❌ Basic connectivity failed:', error);
      console.log('This might indicate a network issue or the URL is not reachable');
    }
    
    // Test 1: Try OPTIONS request first
    try {
      console.log('📤 Sending OPTIONS request...');
      const optionsResponse = await fetch(`${this.baseURL}/generate_theme`, {
        method: 'OPTIONS', // CORS preflight
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('📡 CORS preflight response received:', {
        status: optionsResponse.status,
        statusText: optionsResponse.statusText,
        ok: optionsResponse.ok,
        url: optionsResponse.url,
        headers: Object.fromEntries(optionsResponse.headers.entries())
      });
      
      if (optionsResponse.ok) {
        console.log('✅ CORS preflight successful');
        return true;
      } else {
        console.log('❌ CORS preflight failed with status:', optionsResponse.status);
      }
    } catch (error) {
      console.error('❌ OPTIONS request failed:', error);
    }
    
    // Test 2: Try a simple POST request
    try {
      console.log('📤 Sending test POST request...');
      const testPayload = {
        request: "test connection",
        currentTheme: {},
        timestamp: new Date().toISOString()
      };
      
      console.log('📤 Test payload:', testPayload);
      
      const postResponse = await fetch(`${this.baseURL}/generate_theme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(testPayload)
      });
      
      console.log('📡 POST response received:', {
        status: postResponse.status,
        statusText: postResponse.statusText,
        ok: postResponse.ok,
        url: postResponse.url,
        headers: Object.fromEntries(postResponse.headers.entries())
      });
      
      if (postResponse.ok) {
        console.log('✅ POST request successful');
        return true;
      } else {
        const errorText = await postResponse.text();
        console.log('❌ POST request failed with status:', postResponse.status);
        console.log('❌ Error response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('❌ POST request failed:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return false;
    }
  }

  // Send theme request to Firebase AI function
  async requestThemeChange(themeRequest) {
    const payload = {
      request: themeRequest,
      currentTheme: this.getCurrentTheme(),
      timestamp: new Date().toISOString(),
    };

    console.log('🚀 Sending theme request:', {
      url: `${this.baseURL}/generate_theme`,
      method: 'POST',
      payload: payload
    });

    try {
      const response = await fetch(`${this.baseURL}/generate_theme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Theme data received:', data);
      return data;
    } catch (error) {
      console.error('❌ Theme API Error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // Get current theme state
  getCurrentTheme() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      primaryColor: computedStyle.getPropertyValue('--primary-color').trim(),
      secondaryColor: computedStyle.getPropertyValue('--secondary-color').trim(),
      accentColor: computedStyle.getPropertyValue('--accent-color').trim(),
      textPrimary: computedStyle.getPropertyValue('--text-primary').trim(),
      textSecondary: computedStyle.getPropertyValue('--text-secondary').trim(),
      background: computedStyle.getPropertyValue('--background').trim(),
      surface: computedStyle.getPropertyValue('--surface').trim(),
      border: computedStyle.getPropertyValue('--border').trim(),
      shadow: computedStyle.getPropertyValue('--shadow').trim(),
      gradient: computedStyle.getPropertyValue('--gradient').trim(),
      gradientAccent: computedStyle.getPropertyValue('--gradient-accent').trim(),
    };
  }

  // Apply theme changes to CSS variables
  applyThemeChanges(themeChanges) {
    const root = document.documentElement;
    
    Object.entries(themeChanges).forEach(([property, value]) => {
      if (value && typeof value === 'string') {
        root.style.setProperty(`--${property}`, value);
        console.log(`Applied theme change: --${property} = ${value}`);
      }
    });

    // Trigger a custom event for components to react to theme changes
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { themeChanges } 
    }));
  }

  // Validate theme changes before applying
  validateThemeChanges(themeChanges) {
    const validProperties = [
      'primary-color', 'secondary-color', 'accent-color',
      'text-primary', 'text-secondary', 'background', 'surface',
      'border', 'shadow', 'gradient', 'gradient-accent'
    ];

    const validated = {};
    Object.entries(themeChanges).forEach(([key, value]) => {
      const property = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (validProperties.includes(property) && value) {
        validated[property] = value;
      }
    });

    return validated;
  }

  // Get theme suggestions based on current content
  async getThemeSuggestions(content = '') {
    try {
      const response = await fetch(`${this.baseURL}/theme/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          content,
          currentTheme: this.getCurrentTheme(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Theme suggestions error:', error);
      throw error;
    }
  }

  // Save theme as preset
  async saveThemePreset(themeName, themeData) {
    try {
      const response = await fetch(`${this.baseURL}/theme/presets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: themeName,
          theme: themeData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Save theme preset error:', error);
      throw error;
    }
  }

  // Load theme preset
  async loadThemePreset(presetId) {
    try {
      const response = await fetch(`${this.baseURL}/theme/presets/${presetId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.theme;
    } catch (error) {
      console.error('Load theme preset error:', error);
      throw error;
    }
  }
}

export default ThemeAPI;
