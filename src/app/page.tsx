"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Show intro every time user visits page
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration issue
  if (!mounted) return null;
  return (
    <main className="bg-black text-white h-screen overflow-hidden flex flex-col">

      {/* INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="absolute w-[700px] h-[700px] bg-zinc-800/20 blur-3xl rounded-full"></div>

            <div className="relative text-center px-6">
              <p className="uppercase tracking-[0.5em] text-zinc-500 text-xs md:text-sm mb-8">
                Exclusive Luxury Collection
              </p>

              <h1 className="uppercase leading-[1.15] font-extralight">
                <span className="block text-6xl md:text-[9rem] italic text-white">
                  Limited
                </span>

                <span className="block text-5xl md:text-[7rem] tracking-[0.08em] italic text-zinc-200">
                  Timepiece
                </span>

                <span className="block mt-6 text-sm md:text-lg tracking-[0.6em] text-zinc-500">
                  FOR LIMITED PEOPLE
                </span>
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {!showIntro && (
        <>
          {/* NAVBAR */}
<header className="w-full flex items-center h-20 px-10 border-b border-zinc-900">
  
  {/* LEFT - LOGO */}
  <div className="flex items-center">
    <Image
      src="/tpl2.png"
      alt="Limited Timepiece Logo"
      width={120}
      height={40}
      className="object-contain"
      priority
    />
  </div>

  {/* CENTER - TITLE (true center using flex grow spacer) */}
  <div className="flex-1 flex justify-center">
    <h1 className="text-white font-bold tracking-[0.4em] text-sm md:text-base uppercase whitespace-nowrap">
      TimePiece Luxury
    </h1>
  </div>

  {/* RIGHT - NAV (FORCED RIGHT EDGE) */}
  <div className="flex items-center justify-end ml-auto gap-10 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-zinc-400">
    <Link href="/about" className="hover:text-white transition">
      About
    </Link>

    <Link href="/contact" className="hover:text-white transition">
      Contact
    </Link>
  </div>

</header>

          {/* CENTER */}
          <section className="flex-1 flex items-center justify-center px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">

           {/* CARD 1: AFFILIATE STORE */}
<Link href="/affiliate">
  <motion.div
    whileHover={{ y: -10 }}
    transition={{ duration: 0.4 }}
    className="relative h-[350px] rounded-[2rem] p-[2px] overflow-hidden cursor-pointer"
  >
    {/* ROTATING BORDER EFFECT */}
    <div 
      className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
      style={{
        background: 'conic-gradient(from 0deg, transparent 60%, #fff 90%, transparent 100%)'
      }}
    />

    {/* INNER CARD */}
    <div className="relative z-10 h-full bg-zinc-950 border border-zinc-800 rounded-[2rem] p-14">
      
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative h-full flex flex-col justify-between">
        <div>
          <p className="uppercase tracking-[0.4em] text-zinc-500 text-xs mb-6">
            Luxury Partners
          </p>

          <h2 className="text-4xl md:text-5xl font-extralight uppercase leading-[1.2]">
            Affiliate
            <br />
            Store
          </h2>
        </div>

        <p className="text-zinc-500 uppercase tracking-[0.2em] text-sm">
          Explore Exclusive Collections
        </p>
      </div>

    </div>
  </motion.div>
</Link>

{/* CARD 2: MY STORE */}
<Link href="/store">
  <motion.div
    whileHover={{ y: -10 }}
    transition={{ duration: 0.4 }}
    className="relative h-[350px] rounded-[2rem] p-[2px] overflow-hidden cursor-pointer"
  >
    {/* ROTATING BORDER EFFECT */}
    <div 
      className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
      style={{
        background: 'conic-gradient(from 0deg, transparent 60%, #fff 90%, transparent 100%)'
      }}
    />

    <div className="relative z-10 h-full bg-zinc-950 border border-zinc-800 rounded-[2rem] p-14">

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative h-full flex flex-col justify-between">
        <div>
          <p className="uppercase tracking-[0.4em] text-zinc-500 text-xs mb-6">
            Signature Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-extralight uppercase leading-[1.2]">
            My
            <br />
            Store
          </h2>
        </div>

        <div>
          <p className="text-zinc-400 uppercase tracking-[0.25em] text-sm mb-2">
            Coming Soon
          </p>

          <p className="text-zinc-600 text-sm">
            Virtual Store in Preparation
          </p>
        </div>
      </div>

    </div>
  </motion.div>
</Link>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-zinc-900 py-6 text-center">
            <p className="text-zinc-600 uppercase tracking-[0.3em] text-xs">
              Limited Timepiece © 2026
            </p>
          </footer>
        </>
      )}
    </main>
  );
}