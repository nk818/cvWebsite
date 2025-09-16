# Hand Gesture System Troubleshooting Guide

## Quick Start
1. Open your React app and look for the gesture controller in the top-right corner
2. Click the "+" button to expand the gesture controller
3. Click "Start Camera" and allow camera permissions
4. Try making gestures in front of the camera

## Common Issues & Solutions

### 1. "MediaPipe Hands initialized successfully" but no gestures detected
**Solution:**
- Make sure your hand is clearly visible in the camera feed
- Ensure good lighting conditions
- Try making more deliberate, clear gestures
- Check the browser console for gesture detection logs

### 2. Gestures detected but no actions executed
**Solution:**
- The system now uses gesture stabilization - hold the gesture for a moment
- Check the confidence level (should be above 60%)
- Try the debug buttons to test individual actions
- Look for "Stabilized gesture" messages in the console

### 3. Camera not starting
**Solution:**
- Check browser permissions for camera access
- Try refreshing the page
- Make sure you're using HTTPS (required for camera access)
- Check if another application is using the camera

### 4. Gestures too sensitive or not sensitive enough
**Solution:**
- The system now has lower detection thresholds (0.5 instead of 0.7)
- Gesture stabilization prevents false positives
- Try making more deliberate, slower gestures

## Debug Tools

### Available Debug Buttons:
- **Log Debug Info**: Shows current gesture data and system status
- **Test Actions**: Tests scroll and navigation functions
- **Check System**: Verifies all components are working
- **Test Gestures**: Comprehensive system test

### Console Logs to Watch For:
- `Initializing MediaPipe Hands...` - System starting
- `MediaPipe Hands initialized successfully` - Ready to detect
- `Hand landmarks detected: 21 points` - Hand detected
- `Stabilized gesture: [gesture_name]` - Gesture recognized and ready to execute
- `Executing gesture action: [gesture_name]` - Action being performed

## Gesture Reference

| Gesture | Action | Tips |
|---------|--------|------|
| **Point** (index finger up) | Scroll up/down | Position finger in top/bottom half of camera view |
| **Peace** (V sign) | Navigate sections | Move hand left/right to go to previous/next section |
| **Open Hand** | Go to top | All fingers extended |
| **Fist** | Toggle dark mode | All fingers curled |
| **Pinch** | Click element | Thumb and index finger close together |

## Performance Tips

1. **Lighting**: Ensure good, even lighting on your hands
2. **Background**: Use a plain background for better detection
3. **Distance**: Keep hands 1-2 feet from camera
4. **Stability**: Hold gestures steady for 1-2 seconds
5. **Clear View**: Make sure hands are fully visible in camera frame

## Technical Details

- **Detection Confidence**: 0.5 (lowered from 0.7)
- **Tracking Confidence**: 0.3 (lowered from 0.5)
- **Model Complexity**: 0 (fastest, most responsive)
- **Gesture Stabilization**: Requires consistent gesture for 500ms
- **Max Hands**: 1 (single hand detection)

## Still Having Issues?

1. Check browser console for error messages
2. Try the debug buttons in the gesture controller
3. Test with different hand positions and lighting
4. Make sure you're using a modern browser with WebRTC support
5. Try refreshing the page and restarting the camera

The system is now more robust and should work much better than before!
