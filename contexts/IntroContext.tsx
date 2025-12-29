"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface IntroContextType {
  logoRect: DOMRect | null;
  setLogoRect: (rect: DOMRect) => void;
  keyboardRect: DOMRect | null;
  setKeyboardRect: (rect: DOMRect) => void;
  isTypingDone: boolean;
  setTypingDone: (done: boolean) => void;
  isAnimationComplete: boolean;
  setAnimationComplete: (complete: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [logoRect, setLogoRect] = useState<DOMRect | null>(null);
  const [keyboardRect, setKeyboardRect] = useState<DOMRect | null>(null);
  const [isTypingDone, setTypingDone] = useState(false);
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  return (
    <IntroContext.Provider
      value={{
        logoRect,
        setLogoRect,
        keyboardRect,
        setKeyboardRect,
        isTypingDone,
        setTypingDone,
        isAnimationComplete,
        setAnimationComplete,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error("useIntro must be used within a IntroProvider");
  }
  return context;
}
