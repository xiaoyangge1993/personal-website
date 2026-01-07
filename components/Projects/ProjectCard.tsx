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
import TechStack from "./TechStack";

interface ProjectCardProps {
  title: string;
  description: string;
  highlights: string[];
  color: string;
  techStack?: string[];
}

const ProjectCard = ({
  title,
  description,
  highlights,
  color,
  techStack = [],
}: ProjectCardProps) => {
  return (
    <div className="relative w-[450px] h-[220px] flex-shrink-0">
      <div className="w-full h-full bg-slate-800 rounded-xl shadow-lg p-5 flex flex-col border border-slate-700 hover:border-primary/50 transition-colors">
        <div className="flex items-start gap-4 mb-2">
          <div
            className={clsx(
              "w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md",
              color
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

        <div className="mt-auto pt-2">
          <TechStack stack={techStack} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
