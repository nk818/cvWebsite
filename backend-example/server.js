// Simple Backend API Example for Theme AI
// Run with: node server.js
// Make sure to install dependencies: npm install express cors dotenv

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock AI Theme Generator
const generateThemeFromRequest = (request, currentTheme) => {
  const requestLower = request.toLowerCase();
  
  // Color mapping based on keywords
  const colorKeywords = {
    ocean: { primary: '#0077be', secondary: '#00a8cc', accent: '#74b9ff' },
    sunset: { primary: '#ff7675', secondary: '#fd79a8', accent: '#fdcb6c' },
    forest: { primary: '#00b894', secondary: '#55a3ff', accent: '#6c5ce7' },
    minimal: { primary: '#2d3436', secondary: '#636e72', accent: '#74b9ff' },
    vibrant: { primary: '#e17055', secondary: '#fdcb6e', accent: '#6c5ce7' },
    dark: { primary: '#2d3436', secondary: '#636e72', accent: '#74b9ff' },
    cyberpunk: { primary: '#00ff88', secondary: '#ff0080', accent: '#00ffff' },
    warm: { primary: '#e17055', secondary: '#fdcb6e', accent: '#fd79a8' },
    cool: { primary: '#74b9ff', secondary: '#a29bfe', accent: '#00cec9' },
    professional: { primary: '#2c3e50', secondary: '#34495e', accent: '#3498db' }
  };

  // Find matching color scheme
  let selectedColors = colorKeywords.professional; // default
  
  for (const [keyword, colors] of Object.entries(colorKeywords)) {
    if (requestLower.includes(keyword)) {
      selectedColors = colors;
      break;
    }
  }

  // Generate theme based on selected colors
  const theme = {
    'primary-color': selectedColors.primary,
    'secondary-color': selectedColors.secondary,
    'accent-color': selectedColors.accent,
    'text-primary': requestLower.includes('dark') ? '#f8f9fa' : '#2d3436',
    'text-secondary': requestLower.includes('dark') ? '#cbd5e0' : '#636e72',
    'background': requestLower.includes('dark') ? '#1a202c' : '#ffffff',
    'surface': requestLower.includes('dark') ? '#2d3748' : '#f8f9fa',
    'border': requestLower.includes('dark') ? '#4a5568' : '#e9ecef',
    'shadow': requestLower.includes('dark') ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
    'gradient': `linear-gradient(135deg, ${selectedColors.primary} 0%, ${selectedColors.secondary} 100%)`,
    'gradient-accent': `linear-gradient(135deg, ${selectedColors.accent} 0%, ${selectedColors.primary} 100%)`
  };

  return {
    success: true,
    themeChanges: theme,
    themeName: `AI Generated: ${Object.keys(colorKeywords).find(key => requestLower.includes(key)) || 'Custom'} Theme`,
    message: `Theme generated based on your request: "${request}"`,
    confidence: 0.85
  };
};

// Routes
app.post('/api/theme/adapt', (req, res) => {
  try {
    const { request, currentTheme } = req.body;
    
    if (!request) {
      return res.status(400).json({
        success: false,
        message: 'Theme request is required'
      });
    }

    console.log('Theme request received:', request);
    console.log('Current theme:', currentTheme);

    // Simulate AI processing delay
    setTimeout(() => {
      const result = generateThemeFromRequest(request, currentTheme);
      res.json(result);
    }, 1000 + Math.random() * 2000); // 1-3 second delay

  } catch (error) {
    console.error('Theme generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate theme'
    });
  }
});

app.post('/api/theme/suggestions', (req, res) => {
  try {
    const { content, currentTheme } = req.body;
    
    const suggestions = [
      'Create a modern dark theme with neon accents',
      'Make it look like a professional corporate website',
      'Use warm autumn colors with orange and brown tones',
      'Create a minimalist design with lots of white space',
      'Make it vibrant and energetic with bright colors',
      'Design a cyberpunk-inspired interface',
      'Use ocean-themed blues and teals',
      'Create a forest-inspired nature theme'
    ];

    // Filter suggestions based on current theme
    const filteredSuggestions = suggestions.filter(suggestion => {
      const currentThemeStr = JSON.stringify(currentTheme).toLowerCase();
      const suggestionLower = suggestion.toLowerCase();
      
      // Don't suggest themes too similar to current
      return !suggestionLower.includes('dark') || !currentThemeStr.includes('dark');
    });

    res.json({
      success: true,
      suggestions: filteredSuggestions.slice(0, 5)
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suggestions'
    });
  }
});

app.post('/api/theme/presets', (req, res) => {
  try {
    const { name, theme } = req.body;
    
    // In a real app, you'd save this to a database
    console.log('Saving theme preset:', name);
    
    res.json({
      success: true,
      presetId: `preset_${Date.now()}`,
      message: 'Theme preset saved successfully'
    });

  } catch (error) {
    console.error('Save preset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save theme preset'
    });
  }
});

app.get('/api/theme/presets/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real app, you'd fetch this from a database
    // For now, return a mock theme
    const mockTheme = {
      'primary-color': '#667eea',
      'secondary-color': '#764ba2',
      'accent-color': '#f093fb',
      'text-primary': '#2d3748',
      'text-secondary': '#4a5568',
      'background': '#ffffff',
      'surface': '#f7fafc',
      'border': '#e2e8f0',
      'shadow': 'rgba(0, 0, 0, 0.1)',
      'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'gradient-accent': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    };

    res.json({
      success: true,
      theme: mockTheme,
      name: `Preset ${id}`
    });

  } catch (error) {
    console.error('Load preset error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load theme preset'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎨 Theme AI Backend running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   POST /api/theme/adapt - Generate theme from request`);
  console.log(`   POST /api/theme/suggestions - Get theme suggestions`);
  console.log(`   POST /api/theme/presets - Save theme preset`);
  console.log(`   GET  /api/theme/presets/:id - Load theme preset`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`\n🔗 Frontend should connect to: http://localhost:${PORT}`);
});

module.exports = app;
