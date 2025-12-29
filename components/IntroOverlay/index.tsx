"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/contexts/IntroContext";

export default function IntroOverlay() {
  const {
    logoRect,
    keyboardRect,
    isTypingDone,
    isAnimationComplete,
    setAnimationComplete,
  } = useIntro();
  const [stage, setStage] = useState<"hidden" | "appear" | "fly">("hidden");

  useEffect(() => {
    // console.log("IntroOverlay Effect:", {
    //   isTypingDone,
    //   isAnimationComplete,
    //   hasKeyboardRect: !!keyboardRect,
    //   hasLogoRect: !!logoRect,
    // });

    if (isTypingDone && !isAnimationComplete && keyboardRect && logoRect) {
      setStage("appear");

      // Wait for appear/scale animation (e.g., 1s), then fly
      const flyTimeout = setTimeout(() => {
        setStage("fly");
      }, 1500);

      // Wait for fly animation (e.g., 1s), then complete
      const completeTimeout = setTimeout(() => {
        setAnimationComplete(true);
      }, 2500);

      return () => {
        clearTimeout(flyTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [
    isTypingDone,
    isAnimationComplete,
    keyboardRect,
    logoRect,
    setAnimationComplete,
  ]);

  if (!keyboardRect || !logoRect || isAnimationComplete) return null;

  // Initial Position: Center of Keyboard Container
  const initialX = keyboardRect.left + keyboardRect.width / 2;
  const initialY = keyboardRect.top + keyboardRect.height / 2 - 50; // Adjust slightly up

  // Target Position: Header Logo Position
  // Note: Logo is 'text-xl font-bold', approx 20px height.
  // We need to calculate the exact center of the logo.
  const targetX = logoRect.left + logoRect.width / 2;
  const targetY = logoRect.top + logoRect.height / 2;

  // Calculate scaling factor to match logo size (approx 20px height) from 80px
  // 20px / 80px = 0.25
  const finalScale = 0.25;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] perspective-1000">
      <AnimatePresence>
        {stage !== "hidden" && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              x: initialX,
              y: initialY,
              rotateX: 20, // Match typical keyboard tilt
              rotateY: -10, // Match slight rotation
              z: 0,
              translateX: "-50%",
              translateY: "-50%",
              color: "#fb923c",
              fontWeight: "bold",
              filter: "blur(10px)",
              textShadow: "0 0 20px rgba(251, 146, 60, 0.5)", // Orange glow
            }}
            animate={
              stage === "appear"
                ? {
                    opacity: 1,
                    scale: 1,
                    x: initialX,
                    y: initialY,
                    rotateX: 0,
                    rotateY: 0,
                    z: 50, // Float up slightly in 3D
                    filter: "blur(0px)",
                    textShadow: "0 0 40px rgba(251, 146, 60, 0.8)",
                    transition: {
                      duration: 1.2,
                      type: "spring",
                      bounce: 0.5,
                    },
                  }
                : {
                    // Fly stage
                    opacity: 0, // Keep visible until fully merged
                    scale: finalScale,
                    x: targetX,
                    y: targetY,
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    filter: "blur(0px)",
                    textShadow: "0 0 0px rgba(251, 146, 60, 0)",
                    transition: { duration: 0.8, ease: "easeInOut" },
                  }
            }
            onAnimationComplete={(definition: any) => {
              // Only trigger completion after fly stage finishes
              if (stage === "fly" && definition.x === targetX) {
                setAnimationComplete(true);
              }
            }}
            style={{
              fontSize: "56px",
              position: "absolute",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-inter), sans-serif",
              transformStyle: "preserve-3d",
              top: 0,
              left: 0,
              transformOrigin: "center center", // Ensure scaling happens from center
            }}
          >
            Kevin Xiao
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
