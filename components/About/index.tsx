"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfileCard from "./ProfileCard";
import HobbiesGallery from "./HobbiesGallery";

export default function About() {
  const { t } = useLanguage();
  const { bio } = t.about;

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Profile Card (4 cols) */}
          <div className="lg:col-span-4 h-full">
            <ProfileCard />
          </div>

          {/* Right: Bio & Hobbies (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-slate-100 mb-2 font-artistic">
                {bio.title}
              </h2>
              <p className="text-slate-500 uppercase tracking-widest text-sm mb-4">
                ABOUT ME
              </p>
              <p className="text-slate-300 leading-loose text-lg text-justify">
                {bio.description}
              </p>
            </motion.div>

            {/* Hobbies Gallery */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-slate-700 flex-1 min-h-[350px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HobbiesGallery />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
