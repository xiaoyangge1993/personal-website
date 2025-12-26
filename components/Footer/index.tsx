'use client';

import React from 'react';
import { Github, Linkedin, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">Kevin Xiao</h3>
          <p className="text-slate-400 text-sm">© 2024 All Rights Reserved.</p>
          <p className="text-slate-500 text-xs mt-1">ICP-12345678</p>
        </div>

        {/* Center: Social */}
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors"><Github size={24} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
        </div>

        {/* Right: Rocket */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -5 }}
          whileTap={{ y: -50, opacity: 0, transition: { duration: 0.5 } }}
          className="bg-transparent border border-slate-700 p-3 rounded-full shadow-lg hover:border-slate-500 transition-colors"
          title="Back to Top"
        >
          <Rocket size={24} className="text-white" />
        </motion.button>
      </div>
    </footer>
  );
}
