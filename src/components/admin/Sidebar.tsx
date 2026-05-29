import Link from "next/link";

export default function Sidebar() {

  return (
    <div className="w-[260px] border-r border-white/10 p-8">

      <h1 className="text-3xl font-semibold mb-12">
        Admin
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          href="/admin"
          className="text-neutral-300 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/add-product"
          className="text-neutral-300 hover:text-white"
        >
          Add Product
        </Link>

        <Link
          href="/admin/add-category"
          className="text-neutral-300 hover:text-white"
        >
          Add Category
        </Link>

        <Link
          href="/admin/add-brand"
          className="text-neutral-300 hover:text-white"
        >
          Add Brand
        </Link>

        <Link
          href="/admin/products"
          className="text-neutral-300 hover:text-white"
        >
          All Products
        </Link>

      </div>

    </div>
  );
}