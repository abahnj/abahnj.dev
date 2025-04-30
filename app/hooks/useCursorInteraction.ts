import { useCallback } from 'react';
import { useCursor } from '../context/CursorContext';

/**
 * Hook for interactive elements to change cursor appearance on hover
 * 
 * @param cursorType - Type of cursor to show when hovering ('hover', 'link', 'button', 'text', etc.)
 * @returns - Object with event handlers for the interactive element
 */
export default function useCursorInteraction(cursorType: string = 'hover') {
  const { setCursorType, isCursorDisabled } = useCursor();
  
  const handleMouseEnter = useCallback(() => {
    if (!isCursorDisabled) {
      setCursorType(cursorType);
    }
  }, [setCursorType, cursorType, isCursorDisabled]);
  
  const handleMouseLeave = useCallback(() => {
    if (!isCursorDisabled) {
      setCursorType('default');
    }
  }, [setCursorType, isCursorDisabled]);
  
  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}

/**
 * Example usage:
 * 
 * function Button({ children }) {
 *   const cursorProps = useCursorInteraction('button');
 *   
 *   return (
 *     <button {...cursorProps}>{children}</button>
 *   );
 * }
 */