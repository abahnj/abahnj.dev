import { useEffect, useRef, type RefObject } from 'react';
import { 
  useSwipeHandlers, 
  SwipeDirection,
  triggerHapticFeedback,
  type SwipeCallback
} from '../utils/touchInteractions';

interface SwipeOptions {
  minDistance?: number;
  maxDuration?: number;
  preventDefaultOnSwipe?: boolean;
  enableHapticFeedback?: boolean;
  hapticFeedbackType?: 'light' | 'medium' | 'heavy';
}

/**
 * React hook for detecting swipe gestures on mobile devices
 * 
 * @param elementRef Reference to the HTML element to add swipe detection to
 * @param onSwipe Callback function to run when a swipe is detected
 * @param options Configuration options for swipe detection
 */
export default function useSwipe(
  elementRef: RefObject<HTMLElement | HTMLDivElement | null>,
  onSwipe: (direction: SwipeDirection) => void,
  options: SwipeOptions = {}
): void {
  const { 
    enableHapticFeedback = true, 
    hapticFeedbackType = 'medium',
    ...swipeOptions 
  } = options;
  
  // For storing the cleanup function returned by useSwipeHandlers
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleSwipe: SwipeCallback = (direction) => {
      // Trigger haptic feedback if enabled
      if (enableHapticFeedback) {
        triggerHapticFeedback(hapticFeedbackType);
      }
      
      // Call the original callback
      onSwipe(direction);
    };

    // Set up swipe handlers
    cleanupRef.current = useSwipeHandlers(
      elementRef,
      handleSwipe,
      swipeOptions
    );

    // Clean up event listeners when component unmounts
    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, [elementRef, onSwipe, enableHapticFeedback, hapticFeedbackType]);
}