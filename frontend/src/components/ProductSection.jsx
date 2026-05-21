export default function ProductSection({ products, loading, error }) {
  return (
    <section id="produk" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-extrabold text-slate-950">
            Produk Unggulan
          </h3>

          <a href="#produk" className="font-bold text-blue-700">
            Lihat Semua →
          </a>
        </div>

        {loading && <p className="mt-6 text-slate-500">Loading produk...</p>}

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-40 items-center justify-center rounded-2xl bg-blue-50 p-4 text-5xl">
                  {product.image_url ? (
                  <img
                      src={`http://localhost:8000${product.image_url}`}
                      alt={product.name}
                      className="h-full w-full object-contain"
                  />
                  ) : (
                  <span>🛍️</span>
                  )}
                </div>

                <h4 className="mt-5 font-extrabold text-slate-950">
                  {product.name}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {product.category.name}
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  {product.description}
                </p>

                <p className="mt-4 text-lg font-extrabold text-blue-700">
                  {product.price}
                </p>

                <a
                  href="https://wa.me/"
                  className="mt-4 block rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
                >
                  Tanya Produk
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}