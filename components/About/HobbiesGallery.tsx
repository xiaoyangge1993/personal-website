"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Placeholder images for hobbies (using darker gradients for dark mode)
const hobbyImages = [
  "bg-gradient-to-br from-blue-900 to-slate-900",
  "bg-gradient-to-br from-green-900 to-slate-900",
  "bg-gradient-to-br from-purple-900 to-slate-900",
  "bg-gradient-to-br from-orange-900 to-slate-900",
];

export default function HobbiesGallery() {
  const { t } = useLanguage();
  const { hobbies } = t.about;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hobbies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hobbies.length) % hobbies.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-16 items-center h-full">
      {/* Image Stack */}
      <div className="relative w-64 h-64 md:w-72 md:h-72 flex-shrink-0 perspective-1000">
        <AnimatePresence initial={false} mode="popLayout">
          {hobbies.map((hobby, index) => {
            // Calculate relative index for stacking logic
            const relativeIndex =
              (index - currentIndex + hobbies.length) % hobbies.length;

            // Only render top 3 cards to avoid DOM clutter
            if (relativeIndex > 2) return null;

            // Determine stacking styles
            const isTop = relativeIndex === 0;
            const zIndex = 30 - relativeIndex * 10;
            const scale = 1 - relativeIndex * 0.1;
            const rotate = relativeIndex * 5; // Rotate underlying cards slightly
            const x = relativeIndex * 10;
            const y = relativeIndex * 10;
            const opacity = 1 - relativeIndex * 0.2;

            return (
              <motion.div
                key={hobby.title} // Use title as key for stability
                className={`absolute inset-0 rounded-3xl shadow-2xl border border-slate-700/50 flex items-center justify-center overflow-hidden bg-slate-800`}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{
                  opacity,
                  zIndex,
                  scale,
                  rotate: isTop ? 0 : rotate, // Top card is straight, others rotated
                  x,
                  y,
                }}
                exit={{
                  opacity: 0,
                  x: -50,
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                style={{
                  transformOrigin: "bottom right",
                }}
              >
                {/* Image Placeholder Content */}
                {hobby.img && (
                  <Image
                    src={hobby.img}
                    alt={`${hobby.title} - ${hobby.subtitle}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Text Info */}
      <div className="flex-1 flex flex-col justify-center text-slate-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-primary text-2xl font-bold mb-1">
              {hobbies[currentIndex].title}
            </h3>
            <p className="text-slate-300 text-sm font-medium mb-4 uppercase tracking-wider">
              {hobbies[currentIndex].subtitle}
            </p>
            <p className="text-slate-100 leading-relaxed mb-6 text-justify">
              {hobbies[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-slate-700/50 border border-slate-600 hover:bg-slate-600 hover:border-primary/50 transition-all text-white hover:text-primary group"
            aria-label="Previous Hobby"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-slate-700/50 border border-slate-600 hover:bg-slate-600 hover:border-primary/50 transition-all text-white hover:text-primary group"
            aria-label="Next Hobby"
          >
            <ArrowRight
              size={20}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
