"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Works from "@/components/Works";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";
import { ParticlesProvider } from "@/contexts/ParticlesContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { IntroProvider } from "@/contexts/IntroContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
            <Experience />
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
