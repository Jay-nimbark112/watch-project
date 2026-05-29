"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminUploadForm() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    brand: "",
    category: "",
    name: "",
    price: "",
    affiliate_link: "",
  });

  const [image, setImage] =
    useState<File | null>(null);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!image) return;

    setLoading(true);

    /* IMAGE NAME */
    const fileName = `${Date.now()}-${image.name}`;

    /* UPLOAD IMAGE */
    const { error: uploadError } =
      await supabase.storage
        .from("products")
        .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError);
      setLoading(false);
      return;
    }

    /* GET PUBLIC URL */
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    /* SAVE PRODUCT */
    const { error } = await supabase
      .from("products")
      .insert([
        {
          ...form,
          image: publicUrl,
        },
      ]);

    if (error) {
      console.log(error);
    } else {
      alert("Product Added");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto flex flex-col gap-6"
    >

      console.log("FORM DATA:", form);

  <input
  type="text"
  placeholder="Brand"
  value={form.brand}
  onChange={(e) =>
    setForm({
      ...form,
      brand: e.target.value,
    })
  }
/>

      <input
        type="text"
        placeholder="Category"
        className="bg-black border border-white/20 p-4 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Watch Name"
        className="bg-black border border-white/20 p-4 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Price"
        className="bg-black border border-white/20 p-4 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            price: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Affiliate Link"
        className="bg-black border border-white/20 p-4 rounded-xl"
        onChange={(e) =>
          setForm({
            ...form,
            affiliate_link: e.target.value,
          })
        }
      />

      <input
        type="file"
        onChange={(e) =>
          setImage(e.target.files?.[0] || null)
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black py-4 rounded-xl font-semibold"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>

    </form>
  );
}