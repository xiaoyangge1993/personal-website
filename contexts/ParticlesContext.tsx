"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ParticlesContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticlesContext = createContext<ParticlesContextType | undefined>(
  undefined
);

export function ParticlesProvider({ children }: { children: ReactNode }) {
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  const toggleParticles = () => {
    setParticlesEnabled((prev) => !prev);
  };

  return (
    <ParticlesContext.Provider value={{ particlesEnabled, toggleParticles }}>
      {children}
    </ParticlesContext.Provider>
  );
}

export function useParticles() {
  const context = useContext(ParticlesContext);
  if (context === undefined) {
    throw new Error("useParticles must be used within a ParticlesProvider");
  }
  return context;
}

