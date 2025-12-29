"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiThreedotjs,
} from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";

const skillColors = [
  "bg-blue-500",
  "bg-blue-600",
  "bg-cyan-500",
  "bg-green-500",
  "bg-orange-500",
];

const skillHexColors = [
  "#3b82f6", // blue-500
  "#2563eb", // blue-600
  "#06b6d4", // cyan-500
  "#22c55e", // green-500
  "#f97316", // orange-500
];

const skillLevels = [95, 90, 95, 85, 80];

const skillIcons = [
  SiReact, // React & Next.js
  SiTypescript, // TypeScript
  SiTailwindcss, // Tailwind CSS
  SiNodedotjs, // Node.js
  SiThreedotjs, // Three.js / R3F
];

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(2); // Start in middle
  const { t } = useLanguage();
  const skills = t.skills.items;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % skills.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + skills.length) % skills.length);
  };

  return (
    <section id="skills" className="py-20 overflow-hidden perspective-1000">
      <div className="container mx-auto px-6 relative">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-slate-100 font-artistic mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.skills.title}
        </motion.h2>

        <div className="relative h-[480px] flex justify-center items-center perspective-1000">
          <AnimatePresence initial={false} mode="popLayout">
            {skills.map((skill, index) => {
              // Calculate relative position
              const offset =
                (index - activeIndex + skills.length) % skills.length;
              // Normalize offset to be centered around 0 (e.g., -2, -1, 0, 1, 2)
              let normalizedOffset = offset;
              if (offset > skills.length / 2) normalizedOffset -= skills.length;
              if (offset < -skills.length / 2)
                normalizedOffset += skills.length;

              const isActive = normalizedOffset === 0;
              const absOffset = Math.abs(normalizedOffset);

              // Only show nearby cards
              if (absOffset > 2) return null;

              // Determine z-index based on layer (absOffset)
              // Layer 1 (center, absOffset = 0): highest z-index
              // Layer 2 (middle, absOffset = 1): medium z-index
              // Layer 3 (outermost, absOffset = 2): lowest z-index
              const getZIndex = () => {
                if (absOffset === 0) return "z-30"; // First layer (center)
                if (absOffset === 1) return "z-20"; // Second layer (middle)
                return "z-10"; // Third layer (outermost)
              };

              // Determine 3D z depth based on layer
              const getZDepth = () => {
                if (absOffset === 0) return 100; // First layer (center)
                if (absOffset === 1) return 0; // Second layer (middle)
                return -100; // Third layer (outermost)
              };

              const currentLevel = skillLevels[index];
              const currentColor = skillColors[index];
              const currentHexColor = skillHexColors[index];
              const Icon = skillIcons[index];

              return (
                <motion.div
                  key={skill.name}
                  className={clsx(
                    "absolute w-[280px] md:w-[320px] rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing group",
                    getZIndex()
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: absOffset > 1 ? 0.5 : 1,
                    scale: isActive ? 1.32 : 1.08, // Scaled by 1.2x (1.1*1.2, 0.9*1.2)
                    x: normalizedOffset * 260, // Spacing scaled by ~1.2x (220 -> 260)
                    z: getZDepth(), // Depth based on layer
                    rotateY: normalizedOffset * -25, // Rotation
                  }}
                  whileHover={{ scale: isActive ? 1.38 : 1.14 }} // Hover scaled by 1.2x
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50;
                    if (offset.x < -swipeThreshold) {
                      nextSlide();
                    } else if (offset.x > swipeThreshold) {
                      prevSlide();
                    }
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Fast-out, Slow-in
                  onClick={() => {
                    // Only handle click if not dragging (handled by framer motion usually, but explicit check if needed)
                    // For now, rely on standard behavior or just set active
                    setActiveIndex(index);
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Meteor Border Container - Always visible on active card */}
                  <div
                    className={clsx(
                      "absolute inset-[-2px] rounded-2xl overflow-hidden transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div
                      className="absolute inset-[-50%] w-[200%] h-[200%] animate-spin-slow"
                      style={{
                        top: "-50%",
                        left: "-50%",
                        background: `conic-gradient(from 0deg, transparent 0 300deg, ${currentHexColor} 360deg)`,
                      }}
                    />
                  </div>

                  {/* Inner Card Content */}
                  <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700 overflow-hidden">
                    {/* Background Icon */}
                    <div className="absolute top-[-10px] right-[-10px] opacity-[0.08] pointer-events-none transform rotate-12">
                      <Icon size={140} className="text-white blur-[1px]" />
                    </div>

                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {skill.name}
                        </h3>
                        <p className="text-slate-300 text-sm mb-4">
                          {skill.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm font-semibold mb-1 text-slate-300">
                          <span>{t.skills.proficiency}</span>
                          <span>{currentLevel}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className={clsx(
                              "h-full rounded-full",
                              currentColor
                            )}
                            initial={{ width: 0 }}
                            animate={{
                              width: isActive ? `${currentLevel}%` : "0%",
                            }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation Arrows - Vertically centered, at screen edges */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-4 lg:-left-12 z-40 p-3 rounded-full border border-slate-700 hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all transform hover:scale-110"
            aria-label="Previous Skill"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-4 lg:-right-12 z-40 p-3 rounded-full border border-slate-700 hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all transform hover:scale-110"
            aria-label="Next Skill"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-10">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 flex items-center gap-2">
            {skills.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    className="rounded-full"
                    initial={false}
                    animate={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: isActive
                        ? skillHexColors[index]
                        : "#64748b",
                      scale: isActive ? 1.8 : 1,
                    }}
                    whileHover={{ scale: 1.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
