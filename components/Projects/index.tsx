"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ProjectCard from "./ProjectCard";
import { useParticles } from "@/contexts/ParticlesContext";
import { useLanguage } from "@/contexts/LanguageContext";

const projectColors = [
  "bg-blue-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-rose-500",
];

export default function Projects() {
  const [init, setInit] = useState(false);
  const { particlesEnabled } = useParticles();
  const { t } = useLanguage();
  const projects = t.projects.items;

  // Ref for the container to measure width
  const containerRef = useRef<HTMLDivElement>(null);

  // State to control scrolling
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <section
      id="projects"
      className="relative py-20 bg-slate-900 overflow-hidden"
    >
      {/* Particle Background */}
      {init && particlesEnabled && (
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: {
                    enable: true,
                  },
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    width: 800,
                    height: 800,
                  },
                  value: 40,
                },
                opacity: {
                  value: 0.1,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
            className="absolute inset-0"
          />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-white mb-24 md:mb-32 font-artistic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.projects.title}
        </motion.h2>

        {/* Infinite Horizontal Scroll Container */}
        <div
          className="w-full overflow-hidden mask-fade-sides relative px-6 md:mx-0 md:px-0"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex gap-8 w-max animate-scroll"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Render projects twice to create seamless loop */}
            {[...projects, ...projects].map((project, index) => (
              <article key={`${index}-${project.title}`}>
                <ProjectCard
                  {...project}
                  color={projectColors[index % projects.length]}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
