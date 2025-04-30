import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CursorContextType {
  cursorType: string;
  setCursorType: (type: string) => void;
  isCursorDisabled: boolean;
  toggleCursorEffects: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorType, setCursorType] = useState<string>('default');
  const [isCursorDisabled, setIsCursorDisabled] = useState<boolean>(false);
  
  // Check user's preferences when component mounts
  useEffect(() => {
    // Check local storage for cursor preference
    const savedPreference = localStorage.getItem('cursorDisabled');
    if (savedPreference === 'true') {
      setIsCursorDisabled(true);
    }
    
    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsCursorDisabled(true);
    }
    
    // Check if using touch device
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      setIsCursorDisabled(true);
    }
  }, []);
  
  // Toggle cursor effects
  const toggleCursorEffects = () => {
    const newState = !isCursorDisabled;
    setIsCursorDisabled(newState);
    localStorage.setItem('cursorDisabled', newState.toString());
  };
  
  return (
    <CursorContext.Provider 
      value={{ 
        cursorType, 
        setCursorType, 
        isCursorDisabled, 
        toggleCursorEffects 
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

// Custom hook to use the cursor context
export function useCursor() {
  const context = useContext(CursorContext);
  
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  
  return context;
}