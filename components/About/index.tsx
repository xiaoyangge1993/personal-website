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
    <section id="about" className="py-20 bg-background relative overflow-hidden">
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
              <h2 className="section-heading section-heading-left text-4xl font-bold text-foreground mb-2 font-artistic">
                {bio.title}
              </h2>
              <p className="text-foreground-muted uppercase tracking-widest text-sm mb-4">
                ABOUT ME
              </p>
              <p className="text-foreground-secondary leading-loose text-lg text-justify">
                {bio.description}
              </p>
            </motion.div>

            {/* Hobbies Gallery */}
            <motion.div
              className="bg-surface rounded-3xl p-6 shadow-soft border border-subtle flex-1 min-h-[350px]"
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
