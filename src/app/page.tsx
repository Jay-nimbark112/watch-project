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

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden flex flex-col">

      {/* INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="absolute w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-zinc-800/20 blur-3xl rounded-full"></div>

            <div className="relative text-center px-6">
              <p className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-500 text-[10px] md:text-sm mb-6 md:mb-8">
                Exclusive Luxury Collection
              </p>

              <h1 className="uppercase leading-[1.1] font-extralight">
                <span className="block text-4xl sm:text-6xl md:text-[9rem] italic text-white">
                  Limited
                </span>

                <span className="block text-3xl sm:text-5xl md:text-[7rem] tracking-[0.08em] italic text-zinc-200">
                  Timepiece
                </span>

                <span className="block mt-4 md:mt-6 text-[10px] md:text-lg tracking-[0.4em] md:tracking-[0.6em] text-zinc-500">
                  FOR LIMITED PEOPLE
                </span>
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      {!showIntro && (
        <>
          {/* NAVBAR */}
          <header className="w-full flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20 px-4 sm:px-10 py-4 border-b border-zinc-900 gap-4 sm:gap-0">

            {/* LOGO */}
            <div className="flex items-center">
              <Image
                src="/tpl2.png"
                alt="Limited Timepiece Logo"
                width={100}
                height={35}
                className="object-contain"
                priority
              />
            </div>

            {/* TITLE */}
            <h1 className="text-white font-bold tracking-[0.3em] text-xs sm:text-sm md:text-base uppercase whitespace-nowrap text-center">
              TimePiece Luxury
            </h1>

            {/* NAV */}
            <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-400">
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>

              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>

          </header>

          {/* CENTER */}
          <section className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-6xl">

              {/* CARD 1 */}
              <Link href="/affiliate">
                <motion.div
  whileHover={{ y: -10 }}
  className="relative h-[220px] sm:h-[300px] rounded-[2rem] p-[2px] overflow-hidden cursor-pointer"
>
                  <div
                    className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 60%, #fff 90%, transparent 100%)'
                    }}
                  />

                  <div className="relative z-10 h-full bg-zinc-950 border border-zinc-800 rounded-[2rem] p-5 sm:p-10">

                    <div className="relative h-full flex flex-col justify-between">

                     <div className="w-full">
  <p className="uppercase tracking-[0.3em] text-zinc-500 text-[10px] sm:text-xs mb-3">
    Luxury Partners
  </p>

  <h2 className="text-2xl sm:text-3xl md:text-5xl font-extralight uppercase leading-[1.1]">
    Affiliate<br />Store
  </h2>
</div>
                      <p className="w-full text-zinc-500 uppercase tracking-[0.2em] text-xs sm:text-sm">
  Explore Exclusive Collections
</p>

                    </div>

                  </div>
                </motion.div>
              </Link>

              {/* CARD 2 */}
              <Link href="/store">
              <motion.div
  whileHover={{ y: -10 }}
  className="relative h-[220px] sm:h-[300px] rounded-[2rem] p-[2px] overflow-hidden cursor-pointer"
>
                  <div
                    className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 60%, #fff 90%, transparent 100%)'
                    }}
                  />

                  <div className="relative z-10 h-full bg-zinc-950 border border-zinc-800 rounded-[2rem] p-6 sm:p-14">

                    <div className="relative h-full w-full flex flex-col justify-between">

                      <div>
                        <p className="uppercase tracking-[0.3em] sm:tracking-[0.4em] text-zinc-500 text-[10px] sm:text-xs mb-4 sm:mb-6">
                          Signature Collection
                        </p>

                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight uppercase leading-[1.2]">
                          My
                          <br />
                          Store
                        </h2>
                      </div>

                      <div>
                        <p className="text-zinc-400 uppercase tracking-[0.2em] text-xs sm:text-sm mb-1">
                          Coming Soon
                        </p>

                        <p className="text-zinc-600 text-xs sm:text-sm">
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
            <p className="text-zinc-600 uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              Limited Timepiece © 2026
            </p>
          </footer>

        </>
      )}
    </main>
  );
}