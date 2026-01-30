"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const articleColors = [
  "bg-blue-100",
  "bg-teal-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-indigo-100",
];

const ArticleCard = ({ title, summary, color, link }: any) => {
  const { t } = useLanguage();
  return (
    <motion.div
      className="rounded-xl shadow-md overflow-hidden cursor-pointer h-full border border-slate-700"
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 },
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => {
        if (link) {
          window.open(link, "_blank", "noopener,noreferrer");
        }
      }}
    >
      {/* Cover Image Placeholder */}
      <div className={`h-40 w-full ${color} flex items-center justify-center`}>
        <div className="text-4xl opacity-20">📝</div>
      </div>

      <div className="p-6 bg-slate-800/60 backdrop-blur-sm h-full">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
          {summary}
        </p>

        <div className="mt-4 text-primary font-medium text-sm">
          {t.articles.read_more}
        </div>
      </div>
    </motion.article>
  );
};

export default function Articles() {
  const { t } = useLanguage();
  const articles = t.articles.items;

  return (
    <section id="articles" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-slate-100 mb-24 md:mb-32 font-artistic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.articles.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard {...article} color={articleColors[index]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
