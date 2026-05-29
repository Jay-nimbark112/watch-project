"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Brand = {
  name: string;
  image: string;
};

export default function AffiliateStore() {
  const [watches, setWatches] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("brands")
        .select("name, image");

      if (error) {
        console.log("Supabase error:", error);
        setLoading(false);
        return;
      }

      console.log("DATA:", data);

      setWatches(data || []);
    } catch (err) {
      console.log("Unexpected error:", err);
    } finally {
      setLoading(false); // ✅ ALWAYS runs
    }
  };

  fetchData();
}, []);

  // slug function
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const category = "watch-under-10k";

  return (
  <main className="bg-black text-white min-h-screen w-full py-10 px-4 sm:px-6 lg:px-16">

    {/* TITLE */}
    <div className="flex flex-col items-center mb-10">
      <h1 className="text-[10px] sm:text-xs tracking-[0.6em] sm:tracking-[0.9em] uppercase text-neutral-400 text-center">
        Premium Collection
      </h1>
    </div>

    <div className="max-w-[1600px] mx-auto">

      {/* GRID FIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : (
          watches.map((watch) => (
            <Link
              key={watch.name}
              href={`/affiliate/${slugify(watch.name)}`}
              className="group border border-white rounded-[20px] sm:rounded-[28px] bg-[#050505] overflow-hidden"
            >

              {/* IMAGE SECTION */}
             <div className="aspect-square w-full flex items-center justify-center overflow-hidden p-4 sm:p-6">
  <img
    src={watch.image}
    alt={watch.name}
    className="w-full h-full object-contain group-hover:scale-105 transition duration-700"
  />
</div>

              {/* TEXT */}
              <div className="pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 text-center">

                <h3 className="text-lg sm:text-2xl lg:text-[30px] font-semibold tracking-wide mb-2 sm:mb-3">
                  {watch.name}
                </h3>

              </div>

            </Link>
          ))
        )}

      </div>

    </div>
  </main>
);
}