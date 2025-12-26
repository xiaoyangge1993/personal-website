"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the 3D component to avoid SSR issues with Three.js
const Keyboard3D = dynamic(() => import("./Keyboard3D"), { ssr: false });

export default function Hero() {
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
          <motion.span
            className="text-primary font-semibold text-lg mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Frontend Engineer
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Building <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#FB923C_0%,#ea580c_40%,rgba(255,255,255,0.6)_50%,#ea580c_60%,#FB923C_100%)] bg-[length:200%_auto] animate-shimmer whitespace-nowrap">
              Digital Experiences
            </span>
          </motion.h1>
          <motion.p
            className="text-slate-600 text-lg md:text-xl mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            I'm Kevin Xiao, a passionate developer crafting responsive,
            interactive, and user-friendly web applications.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-orange-200 transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            View My Work
          </motion.button>
        </motion.div>

        {/* Right: 3D Keyboard */}
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-full flex justify-center items-center"
        >
          <Keyboard3D />
        </motion.div>
      </div>
    </section>
  );
}
