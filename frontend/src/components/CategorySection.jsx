import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000";

export default function CategorySection({ categories, loading, error }) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900">
            Kategori Produk
          </h2>

          <Link to="/products" className="font-bold text-blue-700">
            Lihat Semua →
          </Link>
        </div>

        {!loading && !error && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-40 items-center justify-center">
                  {category.image_url ? (
                    <img
                      src={`${API_BASE_URL}${category.image_url}`}
                      alt={category.name}
                      className="h-40 w-40 object-contain"
                    />
                  ) : (
                    <span className="text-6xl">📦</span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-extrabold leading-snug text-slate-900">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}