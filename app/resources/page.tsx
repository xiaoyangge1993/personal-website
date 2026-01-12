"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage, LanguageProvider } from "@/contexts/LanguageContext";
import { ParticlesProvider } from "@/contexts/ParticlesContext";
import { IntroProvider } from "@/contexts/IntroContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Create a client component for the content to use hooks
function ResourcesContent() {
  const { t } = useLanguage();
  const resources = t.resources.items;

  // Colors for category tags
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Documentation":
      case "文档":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Tool":
      case "工具":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Library":
      case "库":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Person":
      case "人物":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Design":
      case "设计":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-primary/30 flex flex-col">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-24 flex-shrink-0"></div>

      {/* Hero Banner */}
      <section className="relative py-20 px-6 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0" />

        {/* Abstract shapes/bg */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-artistic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.resources.title}
          </motion.h1>
          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.resources.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-6 bg-slate-950 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 block h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded border ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <ExternalLink
                    size={16}
                    className="text-slate-500 group-hover:text-primary transition-colors"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <LanguageProvider>
      <ParticlesProvider>
        <IntroProvider>
          <ResourcesContent />
        </IntroProvider>
      </ParticlesProvider>
    </LanguageProvider>
  );
}
