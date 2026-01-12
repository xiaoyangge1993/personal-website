import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import clsx from "clsx";

export default function CooperationProcess() {
  const { t } = useLanguage();
  const { title, steps } = t.studio.process;

  return (
    <section className="py-20 px-6 bg-slate-900 overflow-hidden relative">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-white mb-20 font-artistic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-10 bottom-0 w-0.5 bg-dashed border-l-2 border-slate-700 -translate-x-1/2 hidden md:block" />

          <div className="space-y-[30px] md:space-y-0 relative">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const stepNumber = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={index}
                  className={clsx(
                    "flex flex-col md:flex-row items-center",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card Side */}
                  <div className="w-full md:w-[46%] relative group pt-8">
                    {/* The Stacked Card Design */}
                    <div className="relative">
                      {/* Top Floating Title Bubble */}
                      <div
                        className={clsx(
                          "absolute -top-8 z-20 flex items-center bg-amber-300 text-slate-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg transform transition-transform group-hover:scale-105", // Increased text size to text-lg (approx double visual weight with bold)
                          isLeft ? "-right-[20px]" : "-left-[20px]"
                        )}
                      >
                        {/* Little triangle pointer for bubble */}
                        <div
                          className={clsx(
                            "absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[12px] border-y-transparent rounded-[4px]", // Added rounded corners
                            isLeft
                              ? "left-0 -translate-x-[24px] border-r-[16px] border-r-amber-300" // Increased offset to 24px
                              : "right-0 translate-x-[24px] border-l-[16px] border-l-amber-300" // Increased offset to 24px
                          )}
                        />
                        {/* Step Number and Title - Dynamic Order */}
                        {isLeft ? (
                          <>
                            {step.title}
                            <div className="w-px h-3 bg-amber-800/30 ml-2 mr-2" />
                            <span className="font-black text-amber-800">
                              {stepNumber}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="mr-2 font-black text-amber-800">
                              {stepNumber}
                            </span>
                            <div className="w-px h-3 bg-amber-800/30 mr-2" />
                            {step.title}
                          </>
                        )}
                      </div>

                      {/* Main Content Card */}
                      <div
                        className={clsx(
                          "bg-white text-slate-800 p-6 pt-8 shadow-xl relative z-10 min-h-[140px] flex flex-col justify-center transition-transform duration-300 group-hover:-translate-y-1 w-[96%] md:w-[64%] mx-auto", // Mobile width 96% (increased by 50% from 64%)
                          isLeft ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0",
                          // Corner radius logic: one big corner
                          isLeft
                            ? "rounded-xl rounded-bl-[40px]"
                            : "rounded-xl rounded-br-[40px]"
                        )}
                      >
                        <p className="text-sm md:text-base font-normal leading-relaxed mt-2">
                          {step.content}
                        </p>
                      </div>

                      {/* Decorative Shadow/Layer underneath */}
                      <div
                        className={clsx(
                          "absolute inset-0 bg-blue-500/20 translate-y-2 z-0 transition-transform duration-300 group-hover:translate-y-3 w-[96%] md:w-[64%] mx-auto", // Mobile width 96%
                          isLeft ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0",
                          isLeft
                            ? "rounded-xl rounded-bl-[40px] -translate-x-2"
                            : "rounded-xl rounded-br-[40px] translate-x-2"
                        )}
                      />
                    </div>
                  </div>

                  {/* Spacer / Timeline Node - Hidden on Mobile */}
                  <div className="hidden md:flex w-full md:w-[8%] justify-center py-4 md:py-0 relative self-start mt-8">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 shadow-[0_0_0_4px_rgba(59,130,246,0.3)] z-10 relative">
                      {/* Connecting dashed line for mobile - removed since timeline is hidden on mobile */}
                      {index !== steps.length - 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-700 md:hidden h-[calc(100%+3rem)] hidden" />
                      )}
                    </div>
                  </div>

                  {/* Empty Side for balance */}
                  <div className="w-full md:w-[46%] hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
