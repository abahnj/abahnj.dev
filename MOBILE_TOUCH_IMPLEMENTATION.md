# Mobile Touch Implementation

This document describes the mobile touch optimizations implemented in the resume site.

## Features Implemented

1. **Swipe Gestures for Navigation**
   - Added left/right swipe detection for navigating between job experiences
   - Implemented a swipe indicator teaching users how to interact

2. **Optimized Touch Targets**
   - Ensured all interactive elements meet the 44×44px minimum touch target size
   - Created larger hit areas for timeline markers

3. **Mobile-Specific Animations**
   - Optimized animations for mobile devices
   - Added tap feedback animations 

4. **Haptic Feedback**
   - Added vibration feedback for touch interactions
   - Different intensities for different interaction types

## Implementation Details

### 1. TouchInteractions Utility
```typescript
// app/utils/touchInteractions.ts
import { type RefObject } from 'react';

export enum SwipeDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  NONE = 'none',
}

export type SwipeCallback = (direction: SwipeDirection) => void;

export function useSwipeHandlers(
  element: RefObject<HTMLElement>,
  onSwipe: SwipeCallback,
  config: Partial<SwipeConfig> = {}
): void {
  // Implementation for detecting swipes
}

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
```

### 2. UseSwipe Hook
```typescript
// app/hooks/useSwipe.ts
import { useEffect, useRef, RefObject } from 'react';
import { 
  useSwipeHandlers, 
  SwipeDirection,
  triggerHapticFeedback 
} from '../utils/touchInteractions';

type SwipeCallback = (direction: SwipeDirection) => void;

export default function useSwipe(
  elementRef: RefObject<HTMLElement>,
  onSwipe: (direction: SwipeDirection) => void,
  options: SwipeOptions = {}
): void {
  // React hook implementation for swipe detection
}
```

### 3. TouchableTimelineMarker
Created a touch-optimized version of timeline markers with larger hit areas:
```typescript
// app/components/TouchableTimelineMarker.tsx
import { motion } from 'framer-motion';
import { triggerHapticFeedback } from '../utils/touchInteractions';

export default function TouchableTimelineMarker({ 
  year, 
  isSelected, 
  onClick,
  vertical = false,
  compact = false
}: TouchableTimelineMarkerProps) {
  // Implementation with 44×44px minimum touch targets
}
```

### 4. ExperienceTimeline with Swipe Navigation
Added swipe navigation between job experiences:
```typescript
// In ExperienceTimeline.tsx
const handleSwipe = (direction: SwipeDirection) => {
  if (direction === SwipeDirection.LEFT) {
    // Swipe left -> go to next job (if not at the end)
    if (activeIndex < jobs.length - 1) {
      triggerHapticFeedback('medium');
      scrollToJob(activeIndex + 1);
    }
  } else if (direction === SwipeDirection.RIGHT) {
    // Swipe right -> go to previous job (if not at the beginning)
    if (activeIndex > 0) {
      triggerHapticFeedback('medium');
      scrollToJob(activeIndex - 1);
    }
  }
};

// Setup swipe detection
useSwipe(experienceContainerRef, handleSwipe, {
  minDistance: 40,
  maxDuration: 500,
  enableHapticFeedback: true
});
```

### 5. Mobile-Specific CSS
Added CSS optimizations for touch devices:
```css
/* Touch optimizations */
@media (hover: none) and (pointer: coarse) {
  * {
    touch-action: manipulation;
  }
  
  :root {
    --min-touch-target: 44px;
  }
}
```

## Swipe Indicator
Created a visual indicator to teach users about swipe functionality:
```typescript
// app/components/SwipeIndicator.tsx
export default function SwipeIndicator({ 
  direction = 'both',
  showOnlyOnMobile = true
}: SwipeIndicatorProps) {
  // Implementation of a visual swipe instruction overlay
}
```

## Usage 
The swipe navigation is used in the Experience section to navigate between different job positions by swiping left or right.