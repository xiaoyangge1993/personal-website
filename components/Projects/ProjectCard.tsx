/*
 * @Author: 孝扬
 * @Date: 2025-12-27 11:30:25
 * @LastEditors: 孝扬
 * @LastEditTime: 2025-12-27 15:16:00
 * @Version: V1.0
 * @Description:
 */
"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TechStack from "./TechStack";

interface ProjectCardProps {
  title: string;
  description: string;
  highlights: string[];
  img?: string;
  color: string;
  techStack?: string[];
}

const ProjectCard = ({
  title,
  description,
  highlights,
  img,
  color,
  techStack = [],
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative w-[85vw] max-w-[450px] md:w-[450px] h-[220px] flex-shrink-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full bg-slate-800 rounded-xl shadow-lg p-5 flex flex-col border border-slate-700 group-hover:border-primary/50 transition-colors relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div
              className={clsx(
                "w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md",
                color,
              )}
            >
              {title.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {title}
              </h3>
              <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                {description}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <TechStack stack={techStack} />
          </div>
        </div>

        {/* Hover Image Overlay Animation */}
        <AnimatePresence>
          {isHovered && img && (
            <motion.div
              className="absolute inset-0 z-20"
              initial={{
                clipPath: "circle(0% at 0% 0%)",
                rotate: -5,
                scale: 1.1,
              }}
              animate={{
                clipPath: "circle(150% at 0% 0%)",
                rotate: 0,
                scale: 1,
              }}
              exit={{
                clipPath: "circle(0% at 0% 0%)",
                rotate: -5,
                scale: 1.1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              {/* Overlay Gradient for text readability if needed, though requirements say cover whole card */}
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectCard;
