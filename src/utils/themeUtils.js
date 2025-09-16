// Theme Utilities for CSS Variable Management

// Color utility functions
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const generateGradient = (color1, color2, direction = '135deg') => {
  return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
};

export const generateComplementaryColors = (baseColor) => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return null;

  // Convert to HSL for better color manipulation
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    primary: baseColor,
    secondary: hslToHex(hsl.h + 180, hsl.s, hsl.l),
    accent: hslToHex(hsl.h + 60, hsl.s, hsl.l),
    light: hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 20)),
    dark: hslToHex(hsl.h, hsl.s, Math.max(5, hsl.l - 20))
  };
};

export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

export const hslToHex = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
};

// CSS Variable Management
export const updateCSSVariables = (variables) => {
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([property, value]) => {
    if (value && typeof value === 'string') {
      root.style.setProperty(`--${property}`, value);
    }
  });
};

export const getCSSVariable = (property) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${property}`)
    .trim();
};

export const getAllCSSVariables = () => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const variables = {};
  
  // Get all CSS custom properties
  const cssText = Array.from(document.styleSheets)
    .filter(styleSheet => {
      try {
        return styleSheet.cssRules;
      } catch (e) {
        return false;
      }
    })
    .reduce((acc, styleSheet) => {
      try {
        return acc + Array.from(styleSheet.cssRules)
          .reduce((acc, rule) => acc + rule.cssText, '');
      } catch (e) {
        return acc;
      }
    }, '');

  // Extract CSS custom properties
  const customPropertyRegex = /--([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = customPropertyRegex.exec(cssText)) !== null) {
    const [, property, value] = match;
    variables[property] = value.trim();
  }

  return variables;
};

// Theme validation
export const validateColor = (color) => {
  if (!color) return false;
  
  // Check if it's a valid hex color
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return true;
  }
  
  // Check if it's a valid RGB color
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color)) {
    return true;
  }
  
  // Check if it's a valid HSL color
  if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(color)) {
    return true;
  }
  
  return false;
};

export const validateGradient = (gradient) => {
  if (!gradient) return false;
  
  // Check if it's a valid CSS gradient
  return /^(linear-gradient|radial-gradient|conic-gradient)\(/.test(gradient);
};

// Theme generation helpers
export const generateThemeFromMood = (mood) => {
  const moodThemes = {
    energetic: {
      'primary-color': '#ff6b6b',
      'secondary-color': '#4ecdc4',
      'accent-color': '#45b7d1',
      'text-primary': '#2c3e50',
      'text-secondary': '#7f8c8d',
      'background': '#ffffff',
      'surface': '#f8f9fa',
      'border': '#e9ecef',
      'shadow': 'rgba(0, 0, 0, 0.1)',
      'gradient': 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
      'gradient-accent': 'linear-gradient(135deg, #45b7d1 0%, #96ceb4 100%)'
    },
    calm: {
      'primary-color': '#6c5ce7',
      'secondary-color': '#a29bfe',
      'accent-color': '#74b9ff',
      'text-primary': '#2d3436',
      'text-secondary': '#636e72',
      'background': '#ffffff',
      'surface': '#f8f9fa',
      'border': '#ddd',
      'shadow': 'rgba(0, 0, 0, 0.08)',
      'gradient': 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
      'gradient-accent': 'linear-gradient(135deg, #74b9ff 0%, #81ecec 100%)'
    },
    professional: {
      'primary-color': '#2c3e50',
      'secondary-color': '#34495e',
      'accent-color': '#3498db',
      'text-primary': '#2c3e50',
      'text-secondary': '#7f8c8d',
      'background': '#ffffff',
      'surface': '#f8f9fa',
      'border': '#e9ecef',
      'shadow': 'rgba(0, 0, 0, 0.1)',
      'gradient': 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      'gradient-accent': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
    },
    creative: {
      'primary-color': '#e17055',
      'secondary-color': '#fdcb6e',
      'accent-color': '#6c5ce7',
      'text-primary': '#2d3436',
      'text-secondary': '#636e72',
      'background': '#ffffff',
      'surface': '#f8f9fa',
      'border': '#ddd',
      'shadow': 'rgba(0, 0, 0, 0.1)',
      'gradient': 'linear-gradient(135deg, #e17055 0%, #fdcb6e 100%)',
      'gradient-accent': 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)'
    }
  };

  return moodThemes[mood] || moodThemes.professional;
};

// Animation utilities
export const animateThemeTransition = (duration = 300) => {
  const root = document.documentElement;
  root.style.transition = `all ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    root.style.transition = '';
  }, duration);
};

// Export all utilities
export default {
  hexToRgb,
  rgbToHex,
  generateGradient,
  generateComplementaryColors,
  updateCSSVariables,
  getCSSVariable,
  getAllCSSVariables,
  validateColor,
  validateGradient,
  generateThemeFromMood,
  animateThemeTransition
};
