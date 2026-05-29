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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((p) => (
          <div
            key={p.id}
            className="border border-white/10 rounded-2xl p-4 bg-[#0b0b0b] hover:border-white transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="h-52 flex items-center justify-center overflow-hidden mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* PRODUCT NAME */}
            <h2 className="font-semibold text-lg mb-2 line-clamp-2">
              {p.name}
            </h2>

            {/* PRICE */}
            <p className="text-xl font-bold text-gray-200 mb-4">
              ₹{p.price}
            </p>

            {/* BUY BUTTON */}
            <a
              href={p.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-2 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Buy Now
            </a>

          </div>
        ))}

      </div>

    </main>
  );
}