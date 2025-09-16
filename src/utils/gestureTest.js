// Gesture Test Utility
// This file provides debugging utilities for the hand gesture system

export const logGestureDebugInfo = (gestureData, isDetecting, isInitialized) => {
  console.group('🎯 Gesture Debug Info');
  console.log('Detection Active:', isDetecting);
  console.log('System Initialized:', isInitialized);
  
  if (gestureData) {
    console.log('Current Gesture:', gestureData.gesture);
    console.log('Confidence:', Math.round(gestureData.confidence * 100) + '%');
    console.log('Position:', {
      x: Math.round(gestureData.position.x * 100) + '%',
      y: Math.round(gestureData.position.y * 100) + '%'
    });
  } else {
    console.log('No gesture detected');
  }
  console.groupEnd();
};

export const testGestureActions = () => {
  console.log('🧪 Testing Gesture Actions...');
  
  // Test scroll actions
  console.log('Testing scroll up...');
  window.scrollBy({ top: -200, behavior: 'smooth' });
  
  setTimeout(() => {
    console.log('Testing scroll down...');
    window.scrollBy({ top: 200, behavior: 'smooth' });
  }, 1000);
  
  setTimeout(() => {
    console.log('Testing section navigation...');
    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
    const randomSection = sections[Math.floor(Math.random() * sections.length)];
    const element = document.querySelector(`#${randomSection}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Navigated to:', randomSection);
    }
  }, 2000);
};

export const checkSystemStatus = () => {
  console.log('🔍 Checking System Status...');
  
  // Check MediaPipe availability
  if (typeof window !== 'undefined') {
    console.log('Window object available:', true);
    console.log('Navigator available:', !!navigator);
    console.log('MediaDevices available:', !!navigator.mediaDevices);
  }
  
  // Check for required elements
  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');
  console.log('Video element found:', !!video);
  console.log('Canvas element found:', !!canvas);
  
  // Check for gesture controller
  const gestureController = document.querySelector('.gesture-controller');
  console.log('Gesture controller found:', !!gestureController);
  
  return {
    video: !!video,
    canvas: !!canvas,
    gestureController: !!gestureController
  };
};

// Simple gesture test function
export const testGestureSystem = () => {
  console.log('🧪 Testing Gesture System...');
  
  // Test if gesture controller is visible
  const gestureController = document.querySelector('.gesture-controller');
  if (gestureController) {
    console.log('✅ Gesture controller found');
    
    // Check if camera is running
    const video = document.querySelector('video');
    if (video && video.srcObject) {
      console.log('✅ Camera is active');
    } else {
      console.log('❌ Camera not active - click "Start Camera" first');
    }
    
    // Check for canvas overlay
    const canvas = document.querySelector('canvas');
    if (canvas) {
      console.log('✅ Canvas overlay found');
    } else {
      console.log('❌ Canvas overlay not found');
    }
  } else {
    console.log('❌ Gesture controller not found');
  }
  
  // Test scroll functionality
  console.log('Testing scroll functionality...');
  window.scrollBy({ top: 100, behavior: 'smooth' });
  
  setTimeout(() => {
    window.scrollBy({ top: -100, behavior: 'smooth' });
    console.log('Scroll test completed');
  }, 1000);
};

// Auto-run system check when imported
if (typeof window !== 'undefined') {
  setTimeout(() => {
    checkSystemStatus();
  }, 1000);
}
