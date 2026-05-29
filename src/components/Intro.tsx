"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-white text-4xl md:text-7xl tracking-[0.3em] text-center font-light"
      >
        LIMITED TIMEPIECE
        <br />
        FOR LIMITED PEOPLE
      </motion.h1>
    </div>
  );
}