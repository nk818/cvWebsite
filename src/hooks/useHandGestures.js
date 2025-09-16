import { useEffect, useRef, useState, useCallback } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const useHandGestures = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [gestureData, setGestureData] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [gestureHistory, setGestureHistory] = useState([]);

  // Gesture recognition functions
  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + 
      Math.pow(point1.y - point2.y, 2)
    );
  };

  // Removed unused function

  // Simplified gesture stabilization - immediate execution for testing
  const stabilizeGesture = useCallback((newGesture) => {
    if (!newGesture || newGesture.gesture === 'unknown') {
      setGestureHistory([]);
      return null;
    }

    const now = Date.now();
    
    // Add current gesture to history
    const updatedHistory = [...gestureHistory, { ...newGesture, timestamp: now }].slice(-3);
    setGestureHistory(updatedHistory);
    
    // Immediate execution for high confidence gestures
    if (newGesture.confidence >= 0.9) {
      console.log('High confidence gesture detected:', newGesture.gesture, 'confidence:', newGesture.confidence);
      return newGesture;
    }
    
    return null;
  }, [gestureHistory]);

  const recognizeGesture = useCallback((landmarks) => {
    if (!landmarks || landmarks.length === 0) return null;

    const hand = landmarks[0];
    console.log('Hand landmarks detected:', hand.length, 'points');
    
    // Key landmark indices
    const thumbTip = 4;
    const indexTip = 8;
    const middleTip = 12;
    const ringTip = 16;
    const pinkyTip = 20;
    
    const indexPip = 6;
    const middlePip = 10;
    const ringPip = 14;
    const pinkyPip = 18;
    
    // Check which fingers are extended (simplified)
    const indexExtended = hand[indexTip].y < hand[indexPip].y;
    const middleExtended = hand[middleTip].y < hand[middlePip].y;
    const ringExtended = hand[ringTip].y < hand[ringPip].y;
    const pinkyExtended = hand[pinkyTip].y < hand[pinkyPip].y;
    
    console.log('Finger states:', { indexExtended, middleExtended, ringExtended, pinkyExtended });
    
    // Simplified gesture recognition - focus on most reliable gestures
    
    // 1. POINT - Only index finger extended (most reliable)
    if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
      console.log('Point gesture detected');
      return {
        gesture: 'point',
        position: { x: hand[indexTip].x, y: hand[indexTip].y },
        confidence: 0.95
      };
    }
    
    // 2. PEACE/V - Index and middle extended, others closed
    if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
      console.log('Peace gesture detected');
      return {
        gesture: 'peace',
        position: { x: hand[indexTip].x, y: hand[indexTip].y },
        confidence: 0.98
      };
    }
    
    // 3. FIST - All fingers closed (simplified)
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
      console.log('Fist gesture detected');
      return {
        gesture: 'fist',
        position: { x: hand[9].x, y: hand[9].y },
        confidence: 0.98
      };
    }
    
    // 4. OPEN HAND - All fingers extended
    if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
      console.log('Open hand gesture detected');
      return {
        gesture: 'open_hand',
        position: { x: hand[9].x, y: hand[9].y },
        confidence: 0.98
      };
    }
    
    // 5. THUMBS UP - Only thumb extended (simplified)
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && 
        hand[thumbTip].y < hand[3].y) {
      console.log('Thumbs up detected');
      return {
        gesture: 'thumbs_up',
        position: { x: hand[thumbTip].x, y: hand[thumbTip].y },
        confidence: 0.98
      };
    }
    
    return {
      gesture: 'unknown',
      position: { x: hand[9].x, y: hand[9].y },
      confidence: 0.1
    };
  }, []);

  const onResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the video frame
    if (results.image) {
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    }
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      console.log('Hand landmarks detected:', results.multiHandLandmarks.length);
      const rawGesture = recognizeGesture(results.multiHandLandmarks);
      console.log('Raw gesture detected:', rawGesture);
      const stabilizedGesture = stabilizeGesture(rawGesture);
      console.log('Stabilized gesture:', stabilizedGesture);
      setGestureData(stabilizedGesture);
      
      // Draw hand landmarks
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(ctx, landmarks, Hands.HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 2
        });
        drawLandmarks(ctx, landmarks, {
          color: '#FF0000',
          lineWidth: 1,
          radius: 3
        });
      }
    } else {
      console.log('No hand landmarks detected');
      setGestureData(null);
      setGestureHistory([]);
    }
  }, [recognizeGesture, stabilizeGesture]);

  const initializeHands = useCallback(async () => {
    try {
      console.log('Initializing MediaPipe Hands...');
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`;
        }
      });
      
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0, // Lower complexity for better performance
        minDetectionConfidence: 0.5, // Lower threshold for easier detection
        minTrackingConfidence: 0.3 // Lower threshold for better tracking
      });
      
      hands.onResults(onResults);
      handsRef.current = hands;
      console.log('MediaPipe Hands initialized successfully');
      
      return hands;
    } catch (error) {
      console.error('Error initializing MediaPipe Hands:', error);
      throw error;
    }
  }, [onResults]);

  const startCamera = useCallback(async () => {
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (!video || !canvas) {
        throw new Error('Video or canvas element not found');
      }

      // Initialize hands first
      const hands = await initializeHands();
      
      // Set up camera
      const camera = new Camera(video, {
        onFrame: async () => {
          if (hands) {
            await hands.send({ image: video });
          }
        },
        width: 640,
        height: 480
      });
      
      cameraRef.current = camera;
      await camera.start();
      
      // Set canvas dimensions to match video
      canvas.width = 640;
      canvas.height = 480;
      
      setIsInitialized(true);
      setIsDetecting(true);
      
      console.log('Camera started successfully');
      
    } catch (error) {
      console.error('Error starting camera:', error);
      throw error;
    }
  }, [initializeHands]);

  const stopCamera = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    setIsDetecting(false);
    setIsInitialized(false);
    setGestureData(null);
  }, []);

  const toggleDetection = useCallback(() => {
    setIsDetecting(prev => !prev);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    canvasRef,
    gestureData,
    isInitialized,
    isDetecting,
    startCamera,
    stopCamera,
    toggleDetection
  };
};

export default useHandGestures;
