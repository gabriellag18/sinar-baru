import { products } from "./data/products";

const categories = [
  "Kantong Plastik",
  "Plastik Kemasan",
  "Mika Makanan",
  "Dus & Box",
  "Sedotan & Sendok",
  "Perlengkapan Toko",
];

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">Sinar Baru</h1>
          <a
            href="https://wa.me/"
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-semibold text-blue-600">Toko Plastik Sinar Baru</p>
        <h2 className="mt-3 max-w-2xl text-5xl font-bold tracking-tight">
          Kebutuhan plastik dan kemasan untuk usaha Anda
        </h2>
        <p className="mt-5 max-w-xl text-lg text-slate-600">
          Menyediakan kantong plastik, mika makanan, dus, box, sedotan,
          sendok, dan berbagai perlengkapan toko.
        </p>
        <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
          Lihat Produk
        </button>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-3xl font-bold">Kategori Produk</h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-2xl border bg-slate-50 p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold">{category}</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Tersedia berbagai ukuran dan pilihan.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-3xl font-bold">Produk Unggulan</h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.name}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="h-40 rounded-xl bg-slate-200"></div>

                <h4 className="mt-4 text-lg font-semibold">
                  {product.name}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {product.category}
                </p>

                <p className="mt-3 font-semibold text-blue-600">
                  {product.price}
                </p>

                <button className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-white">
                  Tanya Produk
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}