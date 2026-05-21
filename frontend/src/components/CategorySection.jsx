const icons = ["🛍️", "🧻", "🥡", "📦", "🥄", "🏪"];

export default function CategorySection({ categories, loading, error }) {
  return (
    <section id="kategori" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="text-3xl font-extrabold text-slate-950">
          Kategori Produk
        </h3>

        {loading && <p className="mt-6 text-slate-500">Loading kategori...</p>}

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl group-hover:bg-blue-100">
                  {icons[index] ?? "📦"}
                </div>

                <h4 className="mt-5 font-extrabold text-slate-900">
                  {category.name}
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}