import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-800 p-6 text-white">
      <h1 className="text-2xl font-extrabold">
        SINAR BARU
      </h1>

      <p className="mt-1 text-sm text-blue-200">
        Admin Dashboard
      </p>

      <nav className="mt-10 space-y-2">
        <Link
          to="/admin"
          className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
        >
          Products
        </Link>

        <Link
          to="/admin/categories"
          className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
        >
          Categories
        </Link>
      </nav>
    </aside>
  );
}