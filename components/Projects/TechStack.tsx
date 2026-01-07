"use client";

import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiSocketdotio,
  SiPython,
  SiFastapi,
  SiVuedotjs,
  SiFirebase,
  SiRedux,
  SiD3Dotjs,
  SiPostgresql,
  SiFlutter,
  SiDart,
  SiGooglemaps,
  SiAmazon,
  SiSpringboot,
  SiMysql,
  SiOpenjdk,
  SiStripe,
  SiOpenai,
} from "react-icons/si";

interface TechStackProps {
  stack: string[];
}

// Map tech names to icons
const iconMap: { [key: string]: any } = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  "Socket.io": SiSocketdotio,
  Python: SiPython,
  FastAPI: SiFastapi,
  "Vue.js": SiVuedotjs,
  Firebase: SiFirebase,
  Redux: SiRedux,
  "D3.js": SiD3Dotjs,
  Flutter: SiFlutter,
  Dart: SiDart,
  "Google Maps API": SiGooglemaps,
  AWS: SiAmazon,
  Java: SiOpenjdk,
  "Spring Boot": SiSpringboot,
  MySQL: SiMysql,
  Stripe: SiStripe,
  "OpenAI API": SiOpenai,
};

// Map tech names to colors
const colorMap: { [key: string]: string } = {
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "Node.js": "#339933",
  MongoDB: "#47A248",
  "Socket.io": "#010101",
  Python: "#3776AB",
  FastAPI: "#009688",
  "Vue.js": "#4FC08D",
  Firebase: "#FFCA28",
  Redux: "#764ABC",
  "D3.js": "#F9A03C",
  Flutter: "#02569B",
  Dart: "#0175C2",
  "Google Maps API": "#4285F4",
  AWS: "#232F3E",
  Java: "#007396",
  "Spring Boot": "#6DB33F",
  MySQL: "#4479A1",
  Stripe: "#008CDD",
  "OpenAI API": "#412991",
};

export default function TechStack({ stack }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {stack.map((tech) => {
        const Icon = iconMap[tech];
        const color = colorMap[tech] || "#cbd5e1"; // Default to slate-300 if no color

        return (
          <div
            key={tech}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium transition-colors hover:border-slate-600"
          >
            {Icon ? (
              <Icon size={14} style={{ color: color }} />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            )}
            <span className="text-slate-300">{tech}</span>
          </div>
        );
      })}
    </div>
  );
}
