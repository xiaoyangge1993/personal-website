"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIntro } from "@/contexts/IntroContext";

// Dynamically import the 3D component to avoid SSR issues with Three.js
const Keyboard3D = dynamic(() => import("./Keyboard3D"), { ssr: false });

export default function Hero() {
  const { t } = useLanguage();
  const { setKeyboardRect } = useIntro();
  const keyboardContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (keyboardContainerRef.current) {
      const updateRect = () => {
        if (keyboardContainerRef.current) {
          setKeyboardRect(keyboardContainerRef.current.getBoundingClientRect());
        }
      };
      // Force update after mount to ensure layout is stable
      setTimeout(updateRect, 100);
      window.addEventListener("resize", updateRect);
      return () => window.removeEventListener("resize", updateRect);
    }
  }, [setKeyboardRect]);

  return (
    <section
      id="hero"
      className="relative min-h-[50vh] flex items-center pt-20 overflow-hidden bg-background"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          {/* <motion.span
            className="text-primary font-semibold text-lg mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t.hero.role}
          </motion.span> */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-6 !leading-[1.2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t.hero.title_prefix} <br />
            <span className="inline-block mt-3 text-transparent bg-clip-text bg-[linear-gradient(90deg,#FB923C_0%,#ea580c_40%,#ffffff_50%,#ea580c_60%,#FB923C_100%)] bg-[length:200%_auto] animate-shimmer whitespace-nowrap">
              {t.hero.title_highlight}
            </span>
          </motion.h1>
          <motion.p
            className="text-slate-400 text-lg md:text-xl mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.a
            href="#works"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-orange-200 transition-all hover:brightness-110"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t.hero.cta}
            <ArrowRight size={20} />
          </motion.a>

          {/* Roles Module */}
          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {t.hero.roles.map((role, index) => (
              <div
                key={index}
                className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 text-sm font-medium bg-slate-800/50 backdrop-blur-sm hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {role}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Keyboard */}
        <motion.div
          ref={keyboardContainerRef}
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 1, scale: isMobile ? 1.2 : 1.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-full flex justify-center items-center"
        >
          <Keyboard3D />
        </motion.div>
      </div>
    </section>
  );
}
