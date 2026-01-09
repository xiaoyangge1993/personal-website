import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Sparkles, Languages } from "lucide-react";
import clsx from "clsx";
import { useParticles } from "@/contexts/ParticlesContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
            className="fixed inset-0 h-[100vh] bg-slate-900 z-[9999] md:hidden flex flex-col p-8 pt-24"
          >
            {/* Vertical Navigation */}
            <nav className="flex flex-col space-y-6 mb-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-bold text-slate-300 hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Bottom Utilities */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-8">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="text-slate-300 hover:text-primary transition-colors flex items-center gap-2"
                aria-label="Toggle Language"
              >
                <Languages size={24} />
                <span className="text-sm font-medium uppercase">{locale}</span>
              </button>

              <div className="w-px h-6 bg-slate-700" />

              {/* Particles Toggle */}
              <div className="flex items-center gap-2">
                <Sparkles
                  size={24}
                  className={clsx(
                    "transition-colors",
                    particlesEnabled ? "text-primary" : "text-slate-500"
                  )}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent drawer close if needed, though toggleParticles shouldn't bubble
                    toggleParticles();
                  }}
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

              <div className="w-px h-6 bg-slate-700" />

              {/* Social Icons */}
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
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
