import { useEffect, useState, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

interface Position {
  x: number;
  y: number;
}

function CustomCursor() {
  const { cursorType, isCursorDisabled: disabled } = useCursor();
  
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  
  // Refs for the cursor elements
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  
  // Use useRef for trail to avoid re-renders
  const trailRef = useRef<Position[]>(Array(5).fill({ x: 0, y: 0 }));
  
  // Throttle mouse move updates for better performance
  const lastUpdateTimeRef = useRef<number>(0);
  const THROTTLE_MS = 10; // Update at most every 10ms
  
  useEffect(() => {
    // Only attach listeners if not disabled
    if (disabled) return;
    
    // Show cursor once moved
    const handleMouseEnter = () => setIsHidden(false);
    
    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsHidden(true);
    
    // Track cursor position with throttling
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      // Throttle updates for better performance
      if (now - lastUpdateTimeRef.current >= THROTTLE_MS) {
        lastUpdateTimeRef.current = now;
        
        // Update main cursor position with RAF for smooth animation
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          
          // Update trail array with new positions (no state update to avoid re-renders)
          const newTrail = [...trailRef.current];
          newTrail.pop(); // Remove oldest point
          newTrail.unshift({ x: e.clientX, y: e.clientY }); // Add newest point
          trailRef.current = newTrail;
        });
        
        // Only check clickable elements if necessary
        // This check is expensive, so we optimize it
        if (cursorType === 'default') {
          // Check the element under the cursor to determine if it's clickable
          const target = e.target as HTMLElement;
          const clickableElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
          
          // Check if element or its parents are clickable
          let el = target;
          let isTargetClickable = false;
          
          while (el && !isTargetClickable) {
            // Check tag name (faster than other checks)
            if (clickableElements.includes(el.tagName)) {
              isTargetClickable = true;
              break;
            }
            
            // Only check CSS cursor if we haven't found a match by tag yet
            const cursor = window.getComputedStyle(el).cursor;
            if (cursor === 'pointer') {
              isTargetClickable = true;
              break;
            }
            
            // Move up to parent (limiting depth to optimize)
            if (el.parentElement && el !== document.body) {
              el = el.parentElement;
            } else {
              break;
            }
          }
          
          setIsPointer(isTargetClickable);
        }
      }
    };
    
    // Handle mouse down and up for click animation
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Add event listeners
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Remove default cursor from body
    document.body.style.cursor = 'none';
    
    // Cleanup
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [disabled]);
  
  // Skip rendering if disabled or on touch devices
  if (disabled || typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }
  
  // Calculate opacity for trail elements
  const getTrailOpacity = (index: number) => {
    return 0.4 - index * 0.07; // Start at 0.4 and decrease by 0.07 for each element
  };
  
  // Get cursor properties based on the cursor type
  const getCursorProps = () => {
    const defaultProps = {
      dot: {
        size: 'w-4 h-4',
        color: 'bg-white',
        scale: isClicking ? 0.7 : 1,
        inner: null
      },
      ring: {
        size: 'w-10 h-10',
        color: 'border-white',
        scale: isClicking ? 0.8 : 1,
        opacity: 0.5
      }
    };
    
    // Override based on cursor type
    switch(cursorType) {
      case 'link':
        return {
          dot: {
            ...defaultProps.dot,
            color: 'bg-blue-400',
            inner: <div className="w-1 h-1 bg-white rounded-full"></div>
          },
          ring: {
            ...defaultProps.ring,
            scale: 1.2,
            color: 'border-blue-400'
          }
        };
      case 'button':
        return {
          dot: {
            ...defaultProps.dot,
            scale: isClicking ? 0.6 : 0.9,
            color: 'bg-green-400'
          },
          ring: {
            ...defaultProps.ring,
            scale: isClicking ? 0.7 : 1.3,
            color: 'border-green-400'
          }
        };
      case 'text':
        return {
          dot: {
            ...defaultProps.dot,
            scale: 0.7,
            color: 'bg-yellow-300',
            inner: <span className="text-[8px] text-black font-bold">I</span>
          },
          ring: {
            ...defaultProps.ring,
            scale: 0.9,
            color: 'border-yellow-300'
          }
        };
      case 'hover':
        return {
          dot: {
            ...defaultProps.dot,
            scale: 1.1
          },
          ring: {
            ...defaultProps.ring,
            scale: 1.3,
            opacity: 0.7
          }
        };
      default:
        return defaultProps;
    }
  };
  
  const cursorProps = getCursorProps();
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: cursorProps.dot.scale,
          opacity: isHidden ? 0 : 1
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 25,
          duration: 0.01
        }}
      >
        <div 
          className={`${cursorProps.dot.color} ${cursorProps.dot.size} rounded-full flex items-center justify-center`}
        >
          {cursorProps.dot.inner || (isPointer && (
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          ))}
        </div>
      </motion.div>
      
      {/* Cursor ring/outline */}
      <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 z-40 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: cursorProps.ring.scale,
          opacity: isHidden ? 0 : cursorProps.ring.opacity,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 400,
          damping: 28,
          duration: 0.05
        }}
      >
        <div 
          className={`w-10 h-10 rounded-full border ${cursorProps.ring.color}`}
        />
      </motion.div>
      
      {/* Cursor trail - optimized with useMemo for points */}
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={`trail-${index}`}
          className="fixed top-0 left-0 z-30 pointer-events-none mix-blend-difference"
          animate={{
            x: trailRef.current[index]?.x || 0,
            y: trailRef.current[index]?.y || 0,
            opacity: isHidden ? 0 : getTrailOpacity(index)
          }}
          transition={{
            type: "spring",
            stiffness: 200 - index * 20,
            damping: 15,
            mass: 0.2 + index * 0.1,
            // Reduce animation updates
            restDelta: 0.01,
            restSpeed: 0.01
          }}
        >
          <div 
            className="bg-white rounded-full will-change-transform"
            style={{
              width: `${8 - index}px`,
              height: `${8 - index}px`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(CustomCursor);
