"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage, LanguageProvider } from "@/contexts/LanguageContext";
import { ParticlesProvider } from "@/contexts/ParticlesContext";
import { IntroProvider } from "@/contexts/IntroContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";

import CooperationProcess from "@/components/Studio/CooperationProcess";

function StudioContent() {
  const { t } = useLanguage();
  const { title, subtitle, cooperation } = t.studio;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-primary/30 flex flex-col">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-24 flex-shrink-0"></div>

      {/* Hero Banner */}
      <section className="relative py-20 px-6 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 z-0" />

        {/* Abstract shapes/bg */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/3 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/4 translate-x-1/4" />

        <div className="container mx-auto relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-artistic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Cooperation Guide - Receipt Style Card */}
      <section className="py-16 px-6 bg-slate-950 relative">
        <div className="container mx-auto max-w-3xl relative">
          {/* Printer Output Slot Effect */}
          <div className="relative w-full h-14 mx-auto -mb-7 z-20 px-4">
            {/* Outer lighter rectangle */}
            <div className="absolute inset-0 bg-slate-700 rounded-full shadow-xl border-b border-slate-600" />
            {/* Inner darker rectangle (the hole) */}
            <div className="absolute inset-x-2 top-2 bottom-2 bg-slate-950 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] border border-slate-800" />
          </div>

          <motion.div
            className="relative bg-slate-800 text-slate-200 p-8 md:p-12 shadow-2xl mx-auto border-x border-slate-700 rounded-b-3xl w-[90%] z-30"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          >
            {/* Top jagged edge effect simulation if mask doesn't work perfectly or for decoration */}
            {/* Removed top jagged edge, now it comes out of printer slot */}

            {/* Side Cutouts - Matching bg color to simulate holes */}
            <div className="absolute top-[124px] -left-3 w-6 h-6 rounded-full bg-slate-950 z-10" />
            <div className="absolute top-[124px] -right-3 w-6 h-6 rounded-full bg-slate-950 z-10" />

            <div className="absolute bottom-[212px] -left-3 w-6 h-6 rounded-full bg-slate-950 z-10" />
            <div className="absolute bottom-[212px] -right-3 w-6 h-6 rounded-full bg-slate-950 z-10" />

            {/* Receipt Header */}
            <div className="text-center border-b-2 border-dashed border-slate-600 pb-6 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2 text-white">
                {cooperation.title}
              </h2>
              <div className="text-slate-400 text-sm font-mono">
                {new Date().toLocaleDateString()} • REF: #COOP-2024
              </div>
            </div>

            {/* Content List - Fixed height for alignment */}
            <div className="h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <ul className="space-y-6 font-mono text-sm md:text-base leading-relaxed text-slate-300">
                {cooperation.content.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="font-bold min-w-[24px] text-primary">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Receipt Footer */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-600 text-center">
              <div className="inline-block border-2 border-primary text-primary px-4 py-2 font-bold text-lg transform -rotate-2">
                APPROVED
              </div>
              <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest">
                Kevin Xiao Studio
              </p>

              {/* Barcode Simulation */}
              <div className="h-12 mt-6 flex justify-center gap-1 opacity-50">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-400"
                    style={{
                      width: Math.random() > 0.5 ? "2px" : "4px",
                      height: "100%",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cooperation Process Module */}
      <CooperationProcess />

      <Footer />
    </div>
  );
}

export default function StudioPage() {
  return (
    <LanguageProvider>
      <ParticlesProvider>
        <IntroProvider>
          <StudioContent />
        </IntroProvider>
      </ParticlesProvider>
    </LanguageProvider>
  );
}
