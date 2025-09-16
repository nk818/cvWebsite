# 🎨 Dynamic AI Theme System

A powerful theme adaptation system that allows your website to dynamically change its appearance based on AI-generated responses from your backend.

## ✨ Features

- **AI-Powered Theme Generation**: Send natural language requests to your backend AI
- **Real-time CSS Updates**: Changes apply instantly without page reload
- **Gesture Controls**: Use hand gestures to control theme changes
- **Theme History**: Track and revert to previous themes
- **Quick Presets**: One-click theme changes for common styles
- **Custom Overrides**: Manual theme adjustments when needed
- **Backend Integration**: Connect to your own AI backend service

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Frontend dependencies (already installed)
npm install

# Backend dependencies
cd backend-example
npm install
```

### 2. Start the Backend

```bash
cd backend-example
npm start
```

The backend will run on `http://localhost:3001`

### 3. Start the Frontend

```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Use the Theme Controller

1. **Via UI**: Click the theme controller button (🎨) in the top-right corner
2. **Via Gestures**: Make a "Victory" gesture (✌️) to toggle the theme controller
3. **Via Gestures**: Use other gestures for quick theme changes

## 🎮 Gesture Controls

| Gesture | Action |
|---------|--------|
| ✌️ Victory | Show/hide theme controller |
| 👍 Thumbs Up | Show/hide gesture controls |
| ✊ Fist | Toggle dark mode |
| 👌 OK Sign | Toggle dark mode (alternative) |
| 👆 Point | Scroll up/down |
| ✌️ Peace | Navigate sections |
| 🤘 Rock On | Go to top |
| 🖐️ Open Hand | Go to top |

## 🤖 AI Theme Requests

Send natural language requests to your backend AI:

### Examples:
- "Make it look like a cyberpunk interface"
- "Use warm autumn colors with orange and brown tones"
- "Create a professional corporate theme"
- "Make it vibrant and energetic"
- "Design a minimalist interface"
- "Use ocean-themed blues and teals"

### Quick Themes:
- Ocean
- Sunset
- Forest
- Minimal
- Vibrant
- Dark

## 🔧 Backend API

The system expects your backend to provide these endpoints:

### POST /api/theme/adapt
Generate theme changes from a request.

**Request:**
```json
{
  "request": "Make it look cyberpunk",
  "currentTheme": { "primary-color": "#667eea", ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "themeChanges": {
    "primary-color": "#00ff88",
    "secondary-color": "#ff0080",
    "accent-color": "#00ffff",
    ...
  },
  "themeName": "AI Generated: Cyberpunk Theme",
  "message": "Theme generated based on your request",
  "confidence": 0.85
}
```

### POST /api/theme/suggestions
Get theme suggestions based on current content.

### POST /api/theme/presets
Save current theme as a preset.

### GET /api/theme/presets/:id
Load a saved theme preset.

## 🎨 CSS Variables

The system uses CSS custom properties (variables) for theming:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --background: #ffffff;
  --surface: #f7fafc;
  --border: #e2e8f0;
  --shadow: rgba(0, 0, 0, 0.1);
  --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-accent: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

## 🔌 Integration with Your Backend

### 1. Update API Configuration

Edit `src/services/themeAPI.js`:

```javascript
const themeAPI = new ThemeAPI('http://your-backend-url.com/api');
```

### 2. Add Authentication

Update the API service to include your authentication:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${yourApiKey}`,
}
```

### 3. Customize AI Logic

Modify the backend `generateThemeFromRequest` function to use your AI service:

```javascript
// Example with OpenAI
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "You are a web design expert. Generate CSS theme variables based on user requests."
    },
    {
      role: "user",
      content: `Generate a theme for: ${request}`
    }
  ]
});
```

## 🛠️ Advanced Features

### Custom Theme Changes
Use the advanced controls to manually adjust individual CSS variables.

### Theme History
View and revert to previous themes from the history panel.

### Request History
Track all theme requests and their success status.

### Real-time Updates
All changes apply instantly without page reload.

## 🎯 Use Cases

- **Portfolio Websites**: Adapt theme to match project styles
- **E-commerce**: Change theme based on product categories
- **SaaS Applications**: User-customizable interfaces
- **Marketing Sites**: A/B testing different themes
- **Creative Portfolios**: Dynamic visual experiences

## 🔧 Troubleshooting

### Backend Connection Issues
1. Check if backend is running on correct port
2. Verify CORS configuration
3. Check API key configuration

### Theme Changes Not Applying
1. Ensure CSS variables are properly defined
2. Check browser console for errors
3. Verify theme validation

### Gesture Controls Not Working
1. Ensure camera permissions are granted
2. Check lighting conditions
3. Try different hand positions

## 📁 File Structure

```
src/
├── components/
│   ├── ThemeController.js      # Main theme UI component
│   ├── ThemeController.css     # Theme controller styles
│   └── GestureController.js    # Updated with theme gestures
├── hooks/
│   └── useThemeManager.js      # Theme management hook
├── services/
│   └── themeAPI.js             # Backend API service
└── utils/
    └── themeUtils.js           # Theme utility functions

backend-example/
├── server.js                   # Example backend server
├── package.json                # Backend dependencies
└── env.example                 # Environment configuration
```

## 🚀 Next Steps

1. **Customize AI Logic**: Integrate with your preferred AI service
2. **Add Database**: Store theme presets and user preferences
3. **Advanced Features**: Add animation controls, theme previews
4. **User Authentication**: Save personalized themes per user
5. **Analytics**: Track theme usage and user preferences

## 🤝 Contributing

Feel free to extend the system with additional features:

- More gesture controls
- Additional CSS variable support
- Theme animation effects
- User preference storage
- Advanced AI integration

## 📄 License

MIT License - feel free to use in your projects!
