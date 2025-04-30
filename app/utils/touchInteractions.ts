import { type RefObject } from 'react';

// Track initial touch positions
interface TouchPosition {
  x: number;
  y: number;
  timestamp: number;
}

// Swipe direction
export enum SwipeDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  NONE = 'none',
}

// Configuration for swipe detection
interface SwipeConfig {
  minDistance: number;  // Minimum distance to consider a swipe
  maxDuration: number;  // Maximum duration (ms) for a swipe
  preventDefaultOnSwipe?: boolean; // Whether to prevent default behavior on swipe
}

const defaultConfig: SwipeConfig = {
  minDistance: 50,  // 50px minimum swipe distance
  maxDuration: 300, // 300ms maximum swipe duration
  preventDefaultOnSwipe: true,
};

// Swipe callback function type
export type SwipeCallback = (direction: SwipeDirection) => void;

// Add swipe event handlers to a DOM element
export function useSwipeHandlers(
  element: RefObject<HTMLElement | HTMLDivElement | null>,
  onSwipe: SwipeCallback,
  config: Partial<SwipeConfig> = {}
): (() => void) | undefined {
  if (!element.current) return;

  const mergedConfig = { ...defaultConfig, ...config };
  let touchStart: TouchPosition | null = null;

  // Handle touch start event
  const handleTouchStart = (e: Event) => {
    const touchEvent = e as TouchEvent;
    const touch = touchEvent.touches[0];
    touchStart = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };
  };

  // Handle touch end event
  const handleTouchEnd = (e: Event) => {
    const touchEvent = e as TouchEvent;
    if (!touchStart) return;

    const touch = touchEvent.changedTouches[0];
    const touchEnd = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const duration = touchEnd.timestamp - touchStart.timestamp;

    // Check if the swipe meets the minimum distance and maximum duration requirements
    if (duration <= mergedConfig.maxDuration) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX >= mergedConfig.minDistance || absY >= mergedConfig.minDistance) {
        let direction: SwipeDirection;

        // Determine the swipe direction
        if (absX > absY) {
          direction = deltaX > 0 ? SwipeDirection.RIGHT : SwipeDirection.LEFT;
        } else {
          direction = deltaY > 0 ? SwipeDirection.DOWN : SwipeDirection.UP;
        }

        // Prevent default behavior if needed
        if (mergedConfig.preventDefaultOnSwipe) {
          touchEvent.preventDefault();
        }

        // Call the callback with the swipe direction
        onSwipe(direction);
      }
    }

    // Reset touch start position
    touchStart = null;
  };

  // Add event listeners
  element.current.addEventListener('touchstart', handleTouchStart);
  element.current.addEventListener('touchend', handleTouchEnd);

  // Return cleanup function
  return () => {
    if (element.current) {
      element.current.removeEventListener('touchstart', handleTouchStart);
      element.current.removeEventListener('touchend', handleTouchEnd);
    }
  };
}

// Helper function to check if target is larger than 44x44px (minimum touch target size)
export function isValidTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.width >= 44 && rect.height >= 44;
}

// Add haptic feedback if supported
export function triggerHapticFeedback(type: 'light' | 'medium' | 'heavy' = 'medium'): void {
  if (!window.navigator.vibrate) return;
  
  switch (type) {
    case 'light':
      window.navigator.vibrate(10);
      break;
    case 'medium':
      window.navigator.vibrate(20);
      break;
    case 'heavy':
      window.navigator.vibrate([40, 30, 40]);
      break;
  }
}