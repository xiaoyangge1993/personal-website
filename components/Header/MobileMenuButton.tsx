import React from "react";
import { motion } from "framer-motion";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function MobileMenuButton({
  isOpen,
  toggle,
}: MobileMenuButtonProps) {
  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-[10000] md:hidden"
      aria-label="Toggle Menu"
    >
      {/* Top Line */}
      <motion.span
        className="w-6 h-0.5 bg-white rounded-full origin-center"
        animate={
          isOpen
            ? { rotate: 45, y: 8 } // Rotate and move down to form X
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3 }}
      />

      {/* Middle Line */}
      <motion.span
        className="w-6 h-0.5 bg-white rounded-full"
        animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Bottom Line */}
      <motion.span
        className="w-6 h-0.5 bg-white rounded-full origin-center"
        animate={
          isOpen
            ? { rotate: -45, y: -8 } // Rotate and move up to form X
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}
