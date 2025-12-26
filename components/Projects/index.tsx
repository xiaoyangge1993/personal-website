"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Nacos Config",
    description:
      "A centralized configuration management system for microservices.",
    highlights: [
      "Real-time config push",
      "High availability cluster",
      "Multi-tenant support",
    ],
    color: "bg-blue-500",
  },
  {
    title: "E-Commerce",
    description: "Full-featured online shopping platform with dashboard.",
    highlights: ["Next.js App Router", "Stripe Integration", "Admin Dashboard"],
    color: "bg-orange-500",
  },
  {
    title: "Task Master",
    description: "Collaborative project management tool for teams.",
    highlights: ["Real-time sockets", "Kanban board", "Team analytics"],
    color: "bg-purple-500",
  },
  {
    title: "AI Chat",
    description: "Intelligent chatbot interface powered by LLMs.",
    highlights: ["Streaming responses", "Markdown support", "Chat history"],
    color: "bg-green-500",
  },
  {
    title: "Crypto Dash",
    description: "Real-time cryptocurrency tracking dashboard.",
    highlights: ["WebSocket data", "Interactive charts", "Portfolio tracking"],
    color: "bg-indigo-500",
  },
  {
    title: "Travel Log",
    description: "Social platform for sharing travel experiences.",
    highlights: ["Map integration", "Photo gallery", "Social feed"],
    color: "bg-rose-500",
  },
];

export default function Projects() {
  const [init, setInit] = useState(false);

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
      {init && (
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
          className="text-4xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Selected Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
