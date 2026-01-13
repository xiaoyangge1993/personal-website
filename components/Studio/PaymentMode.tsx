import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PaymentMode() {
  const { t } = useLanguage();
  // @ts-ignore - customize_btn might not be in the type definition yet if it's inferred
  const { title, subtitle, cards, customize_btn } = t.studio.payment;

  return (
    <section className="py-20 px-6 bg-slate-950 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-artistic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 shadow-xl overflow-hidden group hover:border-slate-600 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Decorative top gradient/glow - Removed border effect */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 opacity-50" /> */}

              <h3 className="text-2xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
                {card.title}
              </h3>

              <ul className="space-y-4">
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-amber-400 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-slate-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Hover effect glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="mt-16 flex justify-center">
          <Link href="/#about">
            <motion.button
              className="relative group px-10 py-5 bg-slate-900 rounded-full text-white font-bold text-lg overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Border Flow Effect */}
              <div className="absolute inset-[-4px] rounded-full overflow-hidden">
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#f59e0b_360deg)] animate-spin-slow" />
              </div>

              {/* Inner Background */}
              <div className="absolute inset-[2px] bg-slate-900 rounded-full z-10" />

              {/* Button Content */}
              <span className="relative z-20 flex items-center gap-2 text-amber-50">
                {customize_btn}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-amber-400" />
              </span>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-amber-500/5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
