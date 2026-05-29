"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  image: string;
  category: string;
};

type Category = {
  id: number;
 name: string;
  products: Product[];
};

export default function CategoriesPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {

  // unwrap params
  const { brand } = use(params);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // slug helper
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

      const brandName = brand
  .replace(/-/g, " ")
  .toLowerCase();

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      // FETCH CATEGORIES
      const { data: catData, error: catError } = await supabase
        .from("categories")
        .select("id, name");

      if (catError) {

        console.log("Category Error:", catError);

        setCategories([]);
        setLoading(false);

        return;
      }

      // FETCH PRODUCTS
      const { data: productData, error: productError } = await supabase
  .from("products")
  .select("id, image, category")
  .ilike("brand", brandName);

      if (productError) {
        console.log("Product Error:", productError);
      }

      // MERGE PRODUCTS INTO CATEGORIES
      const mergedCategories: Category[] = (catData || []).map((cat) => ({

        ...cat,

        products:
          ((productData || []).filter(
            (product) =>
              slugify(product.category) === slugify(cat.name)
          )) || [],

      }));

      setCategories(mergedCategories);

      setLoading(false);

    };

    fetchData();

  }, []);

  return (
    <main className="bg-black text-white min-h-screen px-6 py-10">

      {/* TITLE */}
      <h1 className="text-4xl font-bold capitalize text-center mb-12">
        {brand.replace(/-/g, " ")} Categories
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">
          Loading categories...
        </p>
      )}

      {/* EMPTY */}
      {!loading && categories.length === 0 && (
        <p className="text-center text-gray-400">
          No categories found
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((cat) => (

         <Link
  key={cat.id}
  href={`/affiliate/${brand}/${slugify(cat.name)}`}
    className="group relative overflow-hidden border border-white/10 rounded-2xl bg-[#0b0b0b] hover:border-white transition-all duration-300 hover:scale-100"

>

 
 {/* DEFAULT IMAGE */}
<div className="relative aspect-square overflow-hidden bg-[#111]">

  {cat.products?.[0]?.image ? (

  <img
  src={cat.products[0].image}
  alt=""
  className="w-full h-full object-cover transform-none"
/>

  ) : (

    <div className="w-full h-full flex items-center justify-center text-gray-500">
      No Image
    </div>

  )}

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/20"></div>

</div>

  {/* CATEGORY NAME */}
  <div className="p-5 relative z-20">

    <h2 className="text-2xl font-semibold text-center">
      {cat.name}
    </h2>

  </div>




{/* HOVER SLIDER */}
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-black/95 z-30 overflow-hidden">

  <div className="h-full flex items-center">

    <div className="flex gap-6 animate-scroll px-6 items-center">

      {cat.products?.length > 0 ? (
        cat.products.map((product, index) => (

         <div
  key={`${product.id}-${index}`}
  className="w-[600px] h-[600px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 transform-none"
>
        <img
  src={product.image}
  alt=""
  className="w-full h-full object-cover"
/>

          </div>

        ))
      ) : (
        <p className="text-gray-400 w-full text-center">
          No products
        </p>
      )}

    </div>

  </div>

</div>


</Link>

        ))}

      </div>

    </main>
  );
}