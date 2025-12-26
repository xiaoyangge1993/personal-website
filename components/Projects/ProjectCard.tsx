"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ProjectCardProps {
  title: string;
  description: string;
  highlights: string[];
  color: string;
}

const ProjectCard = ({
  title,
  description,
  highlights,
  color,
}: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[300px] perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col backface-hidden border border-slate-700">
          <div
            className={clsx(
              "w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl",
              color
            )}
          >
            {title.charAt(0)}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-auto text-primary text-sm font-semibold flex items-center gap-1">
            Hover for details →
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full bg-slate-800 rounded-xl shadow-xl p-6 flex flex-col backface-hidden rotate-y-180 text-white border border-slate-700">
          <h3 className="text-lg font-bold mb-4 border-b border-slate-600 pb-2">
            Key Highlights
          </h3>
          <ul className="space-y-2">
            {highlights.map((item, index) => (
              <li
                key={index}
                className="text-sm text-slate-300 flex items-start gap-2"
              >
                <span className="text-primary mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
