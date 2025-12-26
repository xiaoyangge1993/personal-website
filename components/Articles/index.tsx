"use client";

import React from "react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Understanding React Server Components",
    summary:
      "A deep dive into the architecture and benefits of RSC in Next.js 13+.",
    color: "bg-blue-100",
  },
  {
    title: "Mastering Tailwind CSS Grid",
    summary:
      "Tips and tricks for building complex layouts with utility classes.",
    color: "bg-teal-100",
  },
  {
    title: "The Future of Web Animation",
    summary:
      "Exploring the capabilities of Framer Motion and View Transitions API.",
    color: "bg-purple-100",
  },
  {
    title: "Optimizing Web Performance",
    summary: "Practical guide to improving Core Web Vitals and loading speed.",
    color: "bg-orange-100",
  },
  {
    title: "TypeScript Best Practices",
    summary:
      "Writing clean, maintainable, and type-safe code in large projects.",
    color: "bg-indigo-100",
  },
];

const ArticleCard = ({ title, summary, color }: any) => {
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

        <div className="mt-4 text-primary font-medium text-sm">Read more →</div>
      </div>
    </motion.div>
  );
};

export default function Articles() {
  return (
    <section id="articles" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-slate-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Latest Thoughts
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
              <ArticleCard {...article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
