"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WorkCardProps {
  title: string;
  description: string;
  link: string;
}

const WorkCard = ({ title, description, link }: WorkCardProps) => {
  // Variants for coordinated animations
  const cardVariants = {
    rest: { rotateX: 0, y: 0 },
    hover: {
      rotateX: 25,
      y: 10,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const rippleVariants = {
    rest: { opacity: 0, scale: 0 },
    hover: (i: number) => ({
      opacity: [0, 0.8, 0],
      scale: 1 + i * 0.5,
      transition: {
        duration: 1.8,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "easeOut",
      },
    }),
  };

  const wireVariants = {
    rest: { height: 0, opacity: 0 },
    hover: {
      height: 182, // Increased height by 30% (140 * 1.3 = 182)
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut", delay: 0.1 },
    },
  };

  const linkVariants = {
    rest: { opacity: 0, scale: 0.5, y: 10 },
    hover: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="relative pt-24 group perspective-1000"
      initial="rest"
      whileHover="hover"
    >
      {/* Card */}
      <motion.div
        className="relative bg-slate-800/60 backdrop-blur-sm h-[220px] rounded-xl shadow-lg border border-slate-700 p-8 cursor-pointer overflow-visible z-10"
        variants={cardVariants}
        style={{
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative z-10"
          style={{ transform: "translateZ(30px)" }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>

        {/* Background Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 opacity-50 pointer-events-none rounded-xl overflow-hidden" />

        {/* --- 3D Effects Inside Card (To follow perspective) --- */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Ripple Effect - Centered on card surface */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
            style={{ transform: "translateZ(1px)" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={rippleVariants}
                className="absolute rounded-full border border-orange-500/50 bg-orange-500/20 shadow-[0_0_15px_rgba(251,146,60,0.5)]"
                style={{ width: 80, height: 80 }} // Doubled size
              />
            ))}
            {/* Central glowing dot */}
            <motion.div
              variants={{
                rest: { scale: 0, opacity: 0 },
                hover: { scale: 1, opacity: 1 },
              }}
              className="absolute w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#fb923c]"
            />
          </div>

          {/* Wire - Starting from ripple center, aligned with ripple origin */}
          {/* Ripple center is at top-1/2 left-1/2 with -translate-x-1/2 -translate-y-1/2 */}
          {/* Wire needs to start from the same point, so use translate(-50%, -53%) to align bottom with center point */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-t from-orange-500 to-transparent flex flex-col justify-end items-center origin-bottom"
            variants={wireVariants}
            style={{
              transform:
                "translate(-50%, -53%) rotateX(-25deg) translateY(-50%)", // Start from center point, rotate, then extend upward
            }}
          />
        </div>
      </motion.div>

      {/* Link Box - Outside card's 3D transform space, positioned relative to outer container */}
      {/* Card center is at pt-24 (96px) + card height/2 (110px) = 206px, link is 182px above = 44px */}
      <motion.div
        className="absolute top-[44px] left-0 right-0 flex justify-center pointer-events-auto z-30"
        variants={linkVariants}
      >
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 px-4 py-1.5 rounded-full shadow-xl border border-slate-700 text-xs text-white font-mono whitespace-nowrap flex items-center gap-2 hover:border-orange-500 transition-colors cursor-pointer"
        >
          <ExternalLink size={12} className="text-orange-400" />
          {link}
        </a>
      </motion.div>
    </motion.div>
  );
};

export default function Works() {
  const { t } = useLanguage();
  const works = t.works.items;

  return (
    <section id="works" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-slate-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.works.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <WorkCard {...work} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
