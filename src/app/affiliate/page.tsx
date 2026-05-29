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
    <main className="bg-black text-white min-h-screen w-full py-16 px-8 lg:px-16">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-xs tracking-[0.9em] uppercase text-neutral-400 mb-5">
          Premium Collection
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-4 gap-10">
          {loading ? (
            <p className="text-center col-span-4">Loading...</p>
          ) : (
            watches.map((watch) => (
              <Link
                key={watch.name}
                href={`/affiliate/${slugify(watch.name)}`}
                className="group border border-white rounded-[28px] bg-[#050505] transition-all duration-500 overflow-hidden"
              >
                <div className="h-[340px] flex items-center justify-center overflow-hidden p-8">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="pb-10 px-6 text-center">
                  <h3 className="text-[30px] font-semibold tracking-wide mb-3">
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