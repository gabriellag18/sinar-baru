import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ProductModal from "./ProductModal";
import { getSetting } from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductCatalog({ products, categories, loading, error }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") ?? "all";
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [whatsappNumber, setWhatsappNumber] = useState("");

    useEffect(() => {
    getSetting("whatsapp_number").then((data) => {
        setWhatsappNumber(data.value);
    });
    }, []);
    function getPriceNumber(price) {
    return Number(String(price).replace(/\D/g, "")) || 0;
    }
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((product) =>
        product.categories?.some((category) => category.id === Number(activeCategory))
      );
    }

    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "featured") {
    result.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }

    if (sort === "price-low") {
    result.sort((a, b) => getPriceNumber(a.price) - getPriceNumber(b.price));
    }

    if (sort === "price-high") {
    result.sort((a, b) => getPriceNumber(b.price) - getPriceNumber(a.price));
    }

    if (sort === "stock-low") {
    result.sort((a, b) => (a.stock_quantity ?? 0) - (b.stock_quantity ?? 0));
    }

    if (sort === "stock-high") {
    result.sort((a, b) => (b.stock_quantity ?? 0) - (a.stock_quantity ?? 0));
    }
    return result;
  }, [products, activeCategory, search, sort]);

  return (
    <section id="produk" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950">
              Produk & Kategori
            </h2>
            <p className="mt-2 text-slate-500">
              Cari produk berdasarkan nama atau kategori.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />

            <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-600"
            >
            <option value="name">Sort: Nama</option>
            <option value="price-low">Harga: Rendah → Tinggi</option>
            <option value="price-high">Harga: Tinggi → Rendah</option>
            <option value="stock-low">Stock: Rendah → Tinggi</option>
            <option value="stock-high">Stock: Tinggi → Rendah</option>
            <option value="featured">Featured</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`whitespace-nowrap rounded-full px-5 py-2 font-bold ${
              activeCategory === "all"
                ? "bg-blue-700 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            Semua
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(String(category.id))}
              className={`whitespace-nowrap rounded-full px-5 py-2 font-bold ${
                activeCategory === String(category.id)
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading && <p className="mt-8 text-slate-500">Loading produk...</p>}

        {error && (
          <p className="mt-8 rounded-xl bg-red-50 p-4 text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <>
            <p className="mt-6 text-sm font-semibold text-slate-500">
              Menampilkan {filteredProducts.length} produk
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const imageUrl = product.images?.[0]?.image_url ?? product.image_url ?? "";
                return (
                <div
                  key={product.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-40 items-center justify-center rounded-2xl bg-blue-50 p-4">
                    {imageUrl ? (
                      <img
                        src={`${API_BASE_URL}${imageUrl}`}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-5xl">🛍️</span>
                    )}
                  </div>

                  <h3 className="mt-5 font-extrabold text-slate-950">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {product.categories?.map((c) => c.name).join(", ")}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    {product.description}
                  </p>

                  <p className="mt-4 text-lg font-extrabold text-blue-700">
                    {product.price}
                  </p>
                    {product.show_stock && (
                    <div
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        product.stock_quantity > 10
                            ? "bg-green-100 text-green-700"
                            : product.stock_quantity > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {product.stock_quantity > 0
                        ? `Stock: ${product.stock_quantity}`
                        : "Out of stock"}
                    </div>
                    )}
                    <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                    Detail Produk
                    </button>
                </div>
                );}
            )}
              
            </div>
          </>
        )}
      </div>
    <ProductModal
        product={selectedProduct}
        whatsappNumber={whatsappNumber}
        onClose={() => setSelectedProduct(null)}
    />
    </section>
  );
}