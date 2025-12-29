"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Clock3D = dynamic(() => import("./Clock3D"), { ssr: false });

const ExperienceCard = ({ exp }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-slate-700 cursor-pointer perspective-1000"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase size={18} className="text-primary" />
          <span className="text-sm font-semibold text-slate-300">
            {exp.period}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white">{exp.company}</h3>
        <p className="text-primary font-medium mb-2">{exp.role}</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-slate-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.experience.title}
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left: 3D Clock */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Clock3D />
          </motion.div>

          {/* Right: Timeline */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800" />

            <div className="space-y-12">
              {t.experience.jobs.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {/* Dot */}
                  <div className="absolute left-[9px] top-1.5 w-3.5 h-3.5 bg-primary rounded-full border-4 border-white shadow-sm z-10" />

                  {/* Content Card */}
                  <div className="perspective-1000">
                    <ExperienceCard exp={exp} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
