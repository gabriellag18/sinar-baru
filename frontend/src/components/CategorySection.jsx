const categories = [
  { name: "Kantong Plastik", icon: "🛍️" },
  { name: "Plastik Kemasan", icon: "🧻" },
  { name: "Mika Makanan", icon: "🥡" },
  { name: "Dus & Box", icon: "📦" },
  { name: "Sedotan & Sendok", icon: "🥄" },
  { name: "Perlengkapan Toko", icon: "🏪" },
];

export default function CategorySection() {
  return (
    <section id="kategori" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="text-3xl font-extrabold text-slate-950">
          Kategori Produk
        </h3>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl group-hover:bg-blue-700">
                <span className="group-hover:scale-110 transition">
                  {category.icon}
                </span>
              </div>

              <h4 className="mt-5 font-extrabold text-slate-900">
                {category.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}