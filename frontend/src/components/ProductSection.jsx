import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getSetting } from "../services/api";
import ProductModal from "./ProductModal";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductSection({ products, loading, error }) {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    getSetting("whatsapp_number").then((data) => {
      setWhatsappNumber(data.value);
    });
  }, []);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <section id="produk" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900">
            Produk Unggulan
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
              {products.map((product) => {
                const imageUrl = product.images?.[0]?.image_url ?? product.image_url;
                const getImageUrl = (path) => {
                  if (!path) return "";
                  if (path.startsWith("http")) return path;
                  return `${API_BASE_URL}${path}`;
                };
                return (
                  <Link
                    key={product.id}
                    to={`/products?category=${product.categories?.[0]?.id ?? "all"}`}
                    className="w-[240px] shrink-0 snap-start rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:w-[260px]"
                  >
                    <div className="flex h-52 items-center justify-center rounded-2xl bg-white">
                      {getImageUrl(imageUrl) ? (
                        <img
                          src={getImageUrl(imageUrl)}
                          alt={product.name}
                          className="h-48 w-full object-contain"
                        />
                      ) : (
                        <span className="text-6xl">🛍️</span>
                      )}
                    </div>

                    <h3 className="mt-4 min-h-12 text-base font-extrabold leading-snug text-slate-900">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-lg font-extrabold text-blue-700">
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
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProduct(product);
                      }}
                      className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                      Detail Produk
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
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