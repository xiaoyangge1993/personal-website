/*
 * @Author: 孝扬
 * @Date: 2025-12-27 11:30:25
 * @LastEditors: 孝扬
 * @LastEditTime: 2025-12-27 15:04:11
 * @Version: V1.0
 * @Description:
 */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Sparkles, Languages } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useParticles } from "@/contexts/ParticlesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIntro } from "@/contexts/IntroContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const { particlesEnabled, toggleParticles } = useParticles();
  const { t, locale, toggleLanguage } = useLanguage();
  const { setLogoRect, isAnimationComplete } = useIntro();
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience", "skills", "projects", "works", "articles"];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      const updateRect = () => {
        if (logoRef.current) {
          setLogoRect(logoRef.current.getBoundingClientRect());
        }
      };
      // Force update after mount to ensure layout is stable
      setTimeout(updateRect, 100);
      window.addEventListener("resize", updateRect);
      return () => window.removeEventListener("resize", updateRect);
    }
  }, [setLogoRect]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navItems = [
    { name: t.header.nav.experience, href: "#experience" },
    { name: t.header.nav.skills, href: "#skills" },
    { name: t.header.nav.projects, href: "#projects" },
    { name: t.header.nav.works, href: "#works" },
    { name: t.header.nav.articles, href: "#articles" },
  ];

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
          ref={logoRef}
          href="/"
          className={clsx(
            "text-xl font-bold tracking-tight transition-colors duration-500",
            isAnimationComplete ? "text-primary" : "text-slate-100"
          )}
        >
          Kevin Xiao
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "text-sm font-medium transition-colors relative group",
                activeSection === item.href
                  ? "text-primary"
                  : "text-slate-300 hover:text-primary"
              )}
            >
              {item.name}
              <span
                className={clsx(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Social Icons & Particles Toggle */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="text-slate-300 hover:text-primary transition-colors flex items-center gap-1"
            aria-label="Toggle Language"
          >
            <Languages size={20} />
            <span className="text-sm font-medium uppercase">{locale}</span>
          </button>

          <div className="w-px h-4 bg-slate-700 mx-2" />

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
              aria-label={t.header.toggle_particles}
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
