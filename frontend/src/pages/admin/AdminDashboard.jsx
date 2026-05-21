import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getCategories, getProducts } from "../../services/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(
      ([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      }
    );
  }, []);

  const featuredCount = products.filter((p) => p.is_featured).length;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-blue-700">Admin Dashboard</p>
          <h1 className="mt-1 text-4xl font-extrabold text-slate-950">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-slate-500">
            Kelola produk, kategori, dan tampilan toko Sinar Baru.
          </p>
        </div>

        <a
          href="/"
          className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
        >
          View Website
        </a>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Categories" value={categories.length} />
        <StatCard label="Featured Products" value={featuredCount} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-extrabold text-slate-950">
            Recent Products
          </h2>

          <div className="mt-5 space-y-4">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-bold text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">
                    {product.categories?.map((c) => c.name).join(", ")}
                  </p>
                </div>

                <p className="font-bold text-blue-700">{product.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-sm">
          <h2 className="text-xl font-extrabold">Quick Actions</h2>

          <div className="mt-5 space-y-3">
            <a
              href="/admin/products"
              className="block rounded-2xl bg-white/15 px-4 py-3 font-bold hover:bg-white/20"
            >
              + Add Product
            </a>

            <a
              href="/admin/categories"
              className="block rounded-2xl bg-white/15 px-4 py-3 font-bold hover:bg-white/20"
            >
              + Add Category
            </a>

            <a
              href="/products"
              className="block rounded-2xl bg-white/15 px-4 py-3 font-bold hover:bg-white/20"
            >
              View Catalog
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <h2 className="mt-3 text-5xl font-extrabold text-blue-700">
        {value}
      </h2>
    </div>
  );
}