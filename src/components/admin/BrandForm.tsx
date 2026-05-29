"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BrandForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) {
      showToast("error", "Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("brands")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("brands")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("brands").insert([
        {
          name,
          image: data.publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      setName("");
      setFile(null);
      showToast("success", "Brand added successfully!");
    } catch (err: any) {
      showToast("error", err.message || "Error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">

      {/* Toast */}
      {toast.message && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          🚀 Add New Brand
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brand name"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* File */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full text-white"
          />

          {/* Preview */}
          {file && (
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-40 object-cover rounded-lg border border-white/20 shadow-lg"
            />
          )}

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-600"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02]"
            } text-white shadow-lg`}
          >
            {loading ? "Saving..." : "Add Brand"}
          </button>
        </form>
      </div>
    </div>
  );
} 