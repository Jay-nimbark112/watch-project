"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  brand: string;
  category: string;
  name: string;
  price: number;
  image: string;
  affiliate_link: string;
};

export default function ProductsPage({
  params,
}: {
  params: Promise<{ brand: string; category: string }>;
}) {

  // ✅ unwrap params
  const { brand, category } = use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ slug helper
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {

    const fetchProducts = async () => {

      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.log("Product Error:", error);
        setProducts([]);
        setLoading(false);
        return;
      }

      // ✅ filter by brand + category
      const filtered = (data || []).filter((p) => {

        const productBrand = slugify(p.brand || "");
        const productCategory = slugify(p.category || "");

        return (
          productBrand === brand &&
          productCategory === category
        );
      });

      setProducts(filtered);
      setLoading(false);
    };

    fetchProducts();

  }, [brand, category]);

  return (
    <main className="bg-black text-white min-h-screen px-6 py-10">

      {/* TITLE */}
      <h1 className="text-4xl font-bold capitalize mb-2">
        {brand.replace(/-/g, " ")}
      </h1>

      {/* CATEGORY */}
      <p className="text-gray-400 text-lg capitalize mb-10">
        {category.replace(/-/g, " ")}
      </p>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-400">
          Loading products...
        </p>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <p className="text-gray-400">
          No products found
        </p>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">

        {products.map((p) => (
         <div
  key={p.id}
  className="border border-white/10 rounded-2xl bg-[#0b0b0b] hover:border-white transition-all duration-300 overflow-hidden flex flex-col"
>

  {/* IMAGE - PERFECT SQUARE */}
  <div className="aspect-square w-full flex items-center justify-center p-4 bg-black/20">
    <img
      src={p.image}
      alt={p.name}
      className="w-full h-full object-contain hover:scale-105 transition duration-500"
    />
  </div>

  {/* CONTENT */}
  <div className="p-4 sm:p-5 flex flex-col flex-1">

    {/* NAME */}
    <h2 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2">
      {p.name}
    </h2>

    {/* PRICE */}
    <p className="text-lg sm:text-xl font-bold text-gray-200 mb-4">
      ₹{p.price}
    </p>

    {/* BUTTON (always bottom aligned) */}
    <a
      href={p.affiliate_link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto block text-center bg-white text-black py-2 rounded-xl font-medium hover:bg-gray-200 transition"
    >
      Buy Now
    </a>

  </div>

</div>
        ))}

      </div>

    </main>
  );
}