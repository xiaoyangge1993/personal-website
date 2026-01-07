"use client";

import React from "react";
import { Github, Linkedin, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [isLaunching, setIsLaunching] = React.useState(false);
  const [showRocket, setShowRocket] = React.useState(false);

  // Show rocket only when scrolled near bottom
  React.useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near the bottom of the page
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500; // 500px threshold from bottom

      setShowRocket(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);
    // Wait for launch animation to complete before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Reset rocket after a delay (e.g. 1s scroll + delay)
      setTimeout(() => {
        setIsLaunching(false);
      }, 1500);
    }, 300); // Start scroll after rocket launches
  };

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 relative z-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">Kevin Xiao</h3>
          <p className="text-slate-400 text-sm">{t.footer.rights}</p>
          <p className="text-slate-500 text-xs mt-1">ICP-12345678</p>
        </div>

        {/* Center: Social */}
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
        </div>

        {/* Right: Rocket */}
        <AnimatePresence>
          {showRocket && (
            <div className="fixed bottom-[60px] right-[50px] z-[9999]">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isLaunching
                    ? {
                        scale: 1,
                        rotate: -45, // Rotate to vertical (default Rocket is -45deg)
                        y: -window.innerHeight - 100, // Launch out of screen dynamically
                        opacity: 1,
                        transition: {
                          rotate: { duration: 0.1, ease: "backIn" }, // Anticipation before launch
                          y: { duration: 0.5, ease: "easeIn", delay: 0.1 }, // Accelerate up
                          opacity: { duration: 0.3, delay: 0.8 }, // Fade out late
                        },
                      }
                    : {
                        scale: 1,
                        rotate: 0,
                        y: 0,
                        opacity: 1,
                      }
                }
                exit={{ scale: 0, opacity: 0 }}
                onClick={scrollToTop}
                whileHover={{ y: -5 }}
                className="bg-transparent border border-slate-700 p-3 rounded-full shadow-lg hover:border-slate-500 transition-colors relative z-10 group"
                title={t.footer.back_to_top}
              >
                <Rocket size={24} className="text-white relative z-10" />

                {/* Engine flame effect */}
                {isLaunching && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    className="absolute bottom-0 translate-y-full w-4 h-12 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-sm rounded-full z-0"
                  />
                )}
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
