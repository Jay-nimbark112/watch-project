"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Brand = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

export default function ProductForm() {
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    brand: "",
    category: "",
    name: "",
    price: "",
    affiliate_link: "",
  });

  const [image, setImage] = useState<File | null>(null);

  // ✅ FETCH BRANDS + CATEGORIES
  useEffect(() => {
    const fetchData = async () => {
      const [b, c] = await Promise.all([
        supabase.from("brands").select("*"),
        supabase.from("categories").select("*"),
      ]);

      setBrands(b.data || []);
      setCategories(c.data || []);
    };

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!image) return alert("Upload image");

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${image.name}`;

      // upload image
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, image, {
          contentType: image.type,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      // insert product
      const { error } = await supabase.from("products").insert([
        {
  brand: form.brand.toLowerCase().trim(),
  category: form.category.toLowerCase().trim(),
  name: form.name,
  price: Number(form.price),
  affiliate_link: form.affiliate_link,
  image: data.publicUrl,
},
      ]);

      if (error) throw error;

      alert("Product Added");

      setForm({
        brand: "",
        category: "",
        name: "",
        price: "",
        affiliate_link: "",
      });

      setImage(null);
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6">

      {/* BRAND DROPDOWN */}
      <select
        className="bg-[#050505] border border-white/10 p-4 rounded-2xl"
        value={form.brand}
        onChange={(e) =>
          setForm({ ...form, brand: e.target.value })
        }
      >
        <option value="">Select Brand</option>
        {brands.map((b) => (
          <option key={b.id} value={b.name.toLowerCase()}>
  {b.name}
</option>
        ))}
      </select>

      {/* CATEGORY DROPDOWN */}
      <select
        className="bg-[#050505] border border-white/10 p-4 rounded-2xl"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
         <option key={c.id} value={c.name.toLowerCase()}>
  {c.name}
</option>
        ))}
      </select>

      {/* NAME */}
      <input
        type="text"
        placeholder="Watch Name"
        className="bg-[#050505] border border-white/10 p-4 rounded-2xl"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* PRICE */}
      <input
        type="text"
        placeholder="Price"
        className="bg-[#050505] border border-white/10 p-4 rounded-2xl"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      {/* AFFILIATE LINK */}
      <input
        type="text"
        placeholder="Affiliate Link"
        className="bg-[#050505] border border-white/10 p-4 rounded-2xl"
        value={form.affiliate_link}
        onChange={(e) =>
          setForm({
            ...form,
            affiliate_link: e.target.value,
          })
        }
      />

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) =>
          setImage(e.target.files?.[0] || null)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black py-4 rounded-2xl font-semibold"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}