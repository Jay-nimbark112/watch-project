"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    type: "",
    message: "",
  });

  const showToast = (type: string, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      showToast("error", "Category name required");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("categories").insert([
        {
          name,
        },
      ]);

      if (error) throw error;

      setName("");
      showToast("success", "Category added!");
    } catch (err: any) {
      showToast("error", err.message || "Error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">

      {/* Toast */}
      {toast.message && (
        <div className="fixed top-5 right-5 px-4 py-2 rounded bg-green-500 text-white">
          {toast.message}
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">

        <h2 className="text-white text-xl font-bold mb-4 text-center">
          ➕ Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. Watch under 10k'
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}