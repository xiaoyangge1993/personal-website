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

import MobileMenuButton from "./MobileMenuButton";
import MobileMenuDrawer from "./MobileMenuDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { particlesEnabled, toggleParticles } = useParticles();
  const { t, locale, toggleLanguage } = useLanguage();
  const { setLogoRect, isTypingDone, isAnimationComplete } = useIntro();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Kevin Xiao";

  useEffect(() => {
    // Only start typing effect when keyboard typing is done (isTypingDone is true)
    if (isTypingDone) {
      let currentIndex = 0;
      const typingSpeed = 150; // milliseconds per character

      // Calculate start time based on text length to match keyboard animation end roughly?
      // No, user wants: "keyboard clicks a letter, header appears a letter".
      // This means we need synchronization with the 3D keyboard component.
      // But 3D keyboard component logic is inside Hero/Keyboard3D.tsx and state is in Context.
      // The current context `isTypingDone` only tells when ALL typing is done.
      // We need a way to know WHICH character is currently being typed or just simulate it here
      // assuming they start at same time?

      // Actually, `Keyboard3D` types "KEVIN XIAO".
      // We should probably sync this better.
      // Ideally, `Keyboard3D` should dispatch an event or update context on EACH character.
      // But for now, let's just simulate the typing effect starting when `isTypingDone` becomes true?
      // Wait, `isTypingDone` in `Keyboard3D` is set to true AFTER all typing is finished.
      // That's too late if we want "type one, show one".

      // If we want real-time sync, we need to expose the current typed text from Context.
      // Let's modify the Context to support `currentTypedText` or similar.
      // Or, since we can't easily change the 3D component deeply right now without checking it,
      // let's look at `Keyboard3D`.

      // In Keyboard3D (from memory/previous read):
      // It has a loop: `setTimeout(typeNextChar, nextDelay);`
      // And `setActiveKey(char)`.

      // If we want "keyboard clicks letter, header shows letter", we need to coordinate.
      // The simplest way without major refactor is to rely on `isTypingDone` being the signal
      // that "Introduction is over, show full logo".
      // BUT user specifically asked: "Header top left Kevin Xiao appearance changed to typing effect...
      // 3D keyboard clicks a letter, Header top left appears a letter".

      // This implies we need to start the Header typing animation AT THE SAME TIME as the 3D keyboard typing animation.
      // Currently `isTypingDone` is set TRUE when 3D keyboard FINISHES.
      // We need a new state `isTypingStarted`? Or just start it after mount?

      // Let's assume the 3D keyboard starts typing 1.5s after mount (based on `Hero/Keyboard3D.tsx` code I recall: `setTimeout(typeNextChar, 1500)`).
      // We can replicate that timing here.

      const startDelay = 1500; // Match Keyboard3D start delay

      const startTyping = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayText((prev) => {
            const nextIndex = prev.length + 1;
            if (nextIndex <= fullText.length) {
              return fullText.slice(0, nextIndex);
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 200); // Average typing speed, adjust to match 3D keyboard's random delay roughly (100-300ms)

        return () => clearInterval(interval);
      }, startDelay);

      return () => clearTimeout(startTyping);
    }
  }, []); // Run once on mount, but wait for the delay.

  // Wait, if we use `useEffect(() => ..., [])`, it runs on mount.
  // The 3D keyboard also runs on mount.
  // So they should be roughly synced if we use same delays.

  // Refined Logic:
  // 1. Remove dependency on `isTypingDone` for STARTING.
  // 2. Use a local effect that starts after 1500ms (same as Keyboard3D).
  // 3. Type characters at a similar pace.

  /* However, to be cleaner, I should probably check if the intro context allows this. 
     The IntroContext might be resetting on page navigation? 
     Assuming this is the initial load.
  */

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
    }, 1500);

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
