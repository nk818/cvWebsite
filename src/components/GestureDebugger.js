import React, { useEffect, useState } from 'react';
import './GestureDebugger.css';

const GestureDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({
    mediapipeLoaded: false,
    cameraAccess: false,
    handsDetected: false,
    gestureData: null,
    errors: []
  });

  useEffect(() => {
    const checkMediaPipe = async () => {
      try {
        // Check if MediaPipe modules are available
        const { Hands } = await import('@mediapipe/hands');
        const { Camera } = await import('@mediapipe/camera_utils');
        
        setDebugInfo(prev => ({
          ...prev,
          mediapipeLoaded: true
        }));

        // Test camera access
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop()); // Stop the test stream
          
          setDebugInfo(prev => ({
            ...prev,
            cameraAccess: true
          }));
        } catch (cameraError) {
          setDebugInfo(prev => ({
            ...prev,
            errors: [...prev.errors, `Camera Error: ${cameraError.message}`]
          }));
        }

      } catch (error) {
        setDebugInfo(prev => ({
          ...prev,
          errors: [...prev.errors, `MediaPipe Error: ${error.message}`]
        }));
      }
    };

    checkMediaPipe();
  }, []);

  return (
    <div className="gesture-debugger">
      <h3>Gesture System Debug Info</h3>
      
      <div className="debug-section">
        <h4>System Status</h4>
        <div className={`status-item ${debugInfo.mediapipeLoaded ? 'success' : 'error'}`}>
          MediaPipe Loaded: {debugInfo.mediapipeLoaded ? '✅' : '❌'}
        </div>
        <div className={`status-item ${debugInfo.cameraAccess ? 'success' : 'error'}`}>
          Camera Access: {debugInfo.cameraAccess ? '✅' : '❌'}
        </div>
        <div className={`status-item ${debugInfo.handsDetected ? 'success' : 'pending'}`}>
          Hands Detected: {debugInfo.handsDetected ? '✅' : '⏳'}
        </div>
      </div>

      {debugInfo.errors.length > 0 && (
        <div className="debug-section">
          <h4>Errors</h4>
          {debugInfo.errors.map((error, index) => (
            <div key={index} className="error-item">{error}</div>
          ))}
        </div>
      )}

      <div className="debug-section">
        <h4>Instructions</h4>
        <ol>
          <li>Make sure both MediaPipe and Camera show ✅</li>
          <li>Open the main gesture controller</li>
          <li>Click "Start Camera" and allow permissions</li>
          <li>Try making a pointing gesture (index finger up)</li>
          <li>Check browser console for gesture detection logs</li>
        </ol>
      </div>
    </div>
  );
};

export default GestureDebugger;
