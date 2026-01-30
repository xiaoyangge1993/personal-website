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
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Sparkles, Languages } from "lucide-react";
import clsx from "clsx";

import { useParticles } from "@/contexts/ParticlesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIntro } from "@/contexts/IntroContext";

import MobileMenuButton from "./MobileMenuButton";
import MobileMenuDrawer from "./MobileMenuDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { particlesEnabled, toggleParticles } = useParticles();
  const { t, locale, toggleLanguage } = useLanguage();
  const { setLogoRect, isTypingDone } = useIntro();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Kevin Xiao";

  useEffect(() => {
    // Start typing simulation to sync with 3D keyboard
    // 3D keyboard starts at 1500ms
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typeChar = () => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1));
          currentIndex++;

          // Randomize delay slightly to match the "human" feel of 3D keyboard
          // 3D keyboard uses: Math.random() * 200 + 100
          const nextDelay = Math.random() * 200 + 100;
          setTimeout(typeChar, nextDelay);
        }
      };

      typeChar();
    }, 1600);

    return () => clearTimeout(startTimeout);
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
    // { name: t.header.nav.experience, href: "/#experience" },
    { name: t.header.nav.projects, href: "/#projects" },
    { name: t.header.nav.skills, href: "/#skills" },
    { name: t.header.nav.works, href: "/#works" },
    { name: t.header.nav.articles, href: "/#articles" },
    { name: t.header.nav.about, href: "/#about" },
    { name: t.header.nav.resources, href: "/resources" },
    { name: t.header.nav.studio, href: "/studio" },
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
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        {/* Logo / Name - Ensure higher z-index to stay above drawer */}
        <Link
          ref={logoRef}
          href="/"
          className={clsx(
            "text-xl font-bold tracking-tight transition-colors duration-500 relative z-[10000]",
            // Always show primary color when typing starts (displayText has content)
            displayText.length > 0
              ? "text-primary opacity-100"
              : "text-slate-100 opacity-0"
          )}
        >
          {/* Show typing text if typing is started, otherwise Kevin Xiao (hidden) for layout */}
          {displayText || "Kevin Xiao"}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors relative group text-slate-300 hover:text-primary"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Utilities */}
        <div className="hidden md:flex items-center space-x-4">
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
            aria-label="Visit GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-primary transition-colors"
            aria-label="Visit LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Mobile Menu Drawer */}
        <MobileMenuDrawer
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </motion.header>
  );
}
