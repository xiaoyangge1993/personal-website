"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

import { ParticlesProvider } from "@/contexts/ParticlesContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { IntroProvider } from "@/contexts/IntroContext";

import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Dynamically load below-the-fold components
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Works = dynamic(() => import("@/components/Works"));
const Articles = dynamic(() => import("@/components/Articles"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax Background Elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <LanguageProvider>
      <ParticlesProvider>
        <IntroProvider>
          <main
            ref={containerRef}
            className="relative overflow-hidden bg-background min-h-screen"
          >
            {/* Global Parallax Background Decorations */}
            <motion.div
              style={{ y: y1 }}
              className="fixed top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"
            />
            <motion.div
              style={{ y: y2 }}
              className="fixed bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"
            />

            <Header />
            <Hero />
            {/* <Experience /> */}
            <Projects />
            <Skills />
            <Works />
            <Articles />
            <About />
            <Footer />
          </main>
        </IntroProvider>
      </ParticlesProvider>
    </LanguageProvider>
  );
}
