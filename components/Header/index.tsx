/*
 * @Author: 孝扬
 * @Date: 2025-12-27 11:30:25
 * @LastEditors: 孝扬
 * @LastEditTime: 2025-12-27 15:04:11
 * @Version: V1.0
 * @Description:
 */
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Sparkles } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useParticles } from "@/contexts/ParticlesContext";

const navItems = [
  // { name: 'About', href: '#hero' },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Works", href: "#works" },
  { name: "Articles", href: "#articles" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { particlesEnabled, toggleParticles } = useParticles();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent",
        isScrolled ? "backdrop-blur-md py-4" : "py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-xl font-bold text-slate-100 tracking-tight"
        >
          Kevin Xiao
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Social Icons & Particles Toggle */}
        <div className="flex items-center space-x-4">
          {/* Particles Toggle Switch */}
          <div className="flex items-center space-x-2">
            <Sparkles
              size={16}
              className={clsx(
                "transition-colors",
                particlesEnabled ? "text-primary" : "text-slate-500"
              )}
            />
            <button
              onClick={toggleParticles}
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900",
                particlesEnabled ? "bg-primary" : "bg-slate-700"
              )}
              aria-label="Toggle particles animation"
            >
              <span
                className={clsx(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  particlesEnabled ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
