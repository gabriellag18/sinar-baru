import { useRef } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function CategorySection({ categories, loading, error }) {
  const scrollRef = useRef(null);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900">
            Kategori Produk
          </h2>

          <div className="flex items-center gap-2">
            <button onClick={scrollLeft} className="h-10 w-10 rounded-full border bg-white shadow-sm">
              ←
            </button>
            <button onClick={scrollRight} className="h-10 w-10 rounded-full border bg-white shadow-sm">
              →
            </button>
            <Link to="/products" className="font-bold text-blue-700">
              Lihat Semua →
            </Link>
          </div>
        </div>

        {!loading && !error && (
          <div ref={scrollRef} className="scrollbar-hide mt-8 overflow-x-auto pb-4">
            <div className="flex min-w-max gap-5 snap-x snap-mandatory">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="w-[180px] shrink-0 snap-start rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-36 items-center justify-center">
                    {category.image_url ? (
                      <img
                        src={`${API_BASE_URL}${category.image_url}`}
                        alt={category.name}
                        className="h-32 w-32 object-contain"
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
          </div>
        )}
      </div>
    </section>
  );
}