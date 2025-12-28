"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const skills = [
  {
    name: "React & Next.js",
    description:
      "Building modern, server-rendered applications with the latest features.",
    level: 95,
    color: "bg-blue-500",
  },
  {
    name: "TypeScript",
    description: "Ensuring type safety and scalable codebases.",
    level: 90,
    color: "bg-blue-600",
  },
  {
    name: "Tailwind CSS",
    description: "Rapidly building custom user interfaces.",
    level: 95,
    color: "bg-cyan-500",
  },
  {
    name: "Node.js",
    description: "Developing robust backend services and APIs.",
    level: 85,
    color: "bg-green-500",
  },
  {
    name: "Three.js / R3F",
    description: "Creating immersive 3D web experiences.",
    level: 80,
    color: "bg-orange-500",
  },
];

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(2); // Start in middle

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
          className="text-4xl font-bold text-center text-slate-100 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tech Stack
        </motion.h2>

        <div className="relative h-[400px] flex justify-center items-center perspective-1000">
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

              return (
                <motion.div
                  key={skill.name}
                  className={clsx(
                    "absolute w-[280px] md:w-[320px] rounded-2xl shadow-2xl cursor-pointer group",
                    getZIndex()
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: absOffset > 1 ? 0.5 : 1,
                    scale: isActive ? 1.1 : 0.9,
                    x: normalizedOffset * 220, // Spacing
                    z: getZDepth(), // Depth based on layer
                    rotateY: normalizedOffset * -25, // Rotation
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Fast-out, Slow-in
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Meteor Border Container - Visible on hover */}
                  <div className="absolute inset-[-2px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#fb923c_360deg)] animate-spin-slow"
                      style={{ top: "-50%", left: "-50%" }}
                    />
                  </div>

                  {/* Inner Card Content */}
                  <div className="relative bg-slate-800 rounded-2xl p-6 h-full border border-slate-700">
                    <div className="h-full flex flex-col justify-between">
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
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className={clsx("h-full rounded-full", skill.color)}
                            initial={{ width: 0 }}
                            animate={{
                              width: isActive ? `${skill.level}%` : "0%",
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
      </div>
    </section>
  );
}
