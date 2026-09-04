import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Sparkles, Languages, Sun, Moon } from "lucide-react";
import clsx from "clsx";
import { useParticles } from "@/contexts/ParticlesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  navItems: { name: string; href: string }[];
  onClose: () => void;
}

export default function MobileMenuDrawer({
  isOpen,
  navItems,
  onClose,
}: MobileMenuDrawerProps) {
  const { particlesEnabled, toggleParticles } = useParticles();
  const { t, locale, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-[100vh] bg-background z-[9999] md:hidden flex flex-col p-8 pt-24"
          >
            {/* Vertical Navigation */}
            <nav className="flex flex-col space-y-6 mb-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-bold text-foreground-secondary hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Bottom Utilities */}
            <div className="flex items-center justify-between border-t border-subtle pt-8">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="text-foreground-secondary hover:text-primary transition-colors flex items-center gap-2"
                aria-label="Toggle Language"
              >
                <Languages size={24} />
                <span className="text-sm font-medium uppercase">{locale}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="text-foreground-secondary hover:text-primary transition-colors"
                aria-label={t.header.toggle_theme}
              >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <div className="w-px h-6 bg-foreground/15" />

              {/* Particles Toggle */}
              <div className="flex items-center gap-2">
                <Sparkles
                  size={24}
                  className={clsx(
                    "transition-colors",
                    particlesEnabled ? "text-primary" : "text-foreground-muted"
                  )}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent drawer close if needed, though toggleParticles shouldn't bubble
                    toggleParticles();
                  }}
                  className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                    particlesEnabled ? "bg-primary" : "bg-foreground/20"
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

              <div className="w-px h-6 bg-foreground/15" />

              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="text-foreground-secondary hover:text-primary transition-colors"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-secondary hover:text-primary transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
