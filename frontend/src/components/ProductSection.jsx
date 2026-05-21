import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSetting } from "../services/api";
import ProductModal from "./ProductModal";

const API_BASE_URL = "http://localhost:8000";

export default function ProductSection({ products, loading, error }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    getSetting("whatsapp_number").then((data) => {
      setWhatsappNumber(data.value);
    });
  }, []);

  return (
    <section id="produk" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900">
            Produk Unggulan
          </h2>

          <Link to="/products" className="font-bold text-blue-700">
            Lihat Semua →
          </Link>
        </div>

        {!loading && !error && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/products?category=${product.categories?.[0]?.id ?? "all"}`}
                className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-56 items-center justify-center rounded-2xl bg-white">
                  {product.image_url ? (
                    <img
                      src={`${API_BASE_URL}${product.image_url}`}
                      alt={product.name}
                      className="h-52 w-full object-contain"
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

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProduct(product);
                  }}
                  className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800"
                >
                  Detail Produk
                </button>
              </Link>
            ))}
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