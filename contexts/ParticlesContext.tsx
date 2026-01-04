"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ParticlesContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

const ParticlesContext = createContext<ParticlesContextType | undefined>(
  undefined
);

export function ParticlesProvider({ children }: { children: ReactNode }) {
  const [particlesEnabled, setParticlesEnabled] = useState(false);

  useEffect(() => {
    // Detect system performance to decide whether to enable particles
    const checkPerformance = () => {
      // 1. Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return false;

      const nav = navigator as any;

      // 2. Check for Save-Data mode
      if (nav.connection?.saveData === true) return false;

      // 3. Hardware Concurrency (Logical Processors)
      // Default to 4 if undefined (optimistic assumption for modern desktops)
      const hardwareConcurrency = nav.hardwareConcurrency || 4;

      // 4. Device Memory (RAM in GB) - Only available in some browsers (Chrome/Edge)
      // Default to 4 if undefined (optimistic assumption)
      const deviceMemory = nav.deviceMemory || 4;

      // 5. Basic mobile detection (optional, but good for battery saving)
      // We can be more aggressive on mobile and require higher specs
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        nav.userAgent
      );

      // Criteria:
      // - At least 4 logical cores
      // - At least 4GB RAM
      // - If mobile, maybe be stricter? For now, keep same specs but rely on hardware info.
      
      if (hardwareConcurrency >= 4 && deviceMemory >= 4) {
        return true;
      }

      return false;
    };

    if (checkPerformance()) {
      setParticlesEnabled(true);
    }
  }, []);

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
