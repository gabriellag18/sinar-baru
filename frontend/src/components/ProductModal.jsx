const API_BASE_URL = "http://localhost:8000";

export default function ProductModal({ product, whatsappNumber, onClose }) {
  if (!product) return null;

  const message = encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product.name}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex h-72 items-center justify-center rounded-2xl bg-blue-50">
            {product.image_url ? (
              <img
                src={`${API_BASE_URL}${product.image_url}`}
                alt={product.name}
                className="h-full w-full object-contain p-5"
              />
            ) : (
              <span className="text-6xl">🛍️</span>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              {product.name}
            </h2>

            <p className="mt-2 text-sm font-semibold text-slate-500">
              {product.categories?.map((c) => c.name).join(", ")}
            </p>

            <p className="mt-5 text-slate-700">
              {product.description || "Deskripsi produk belum tersedia."}
            </p>

            <p className="mt-5 text-2xl font-extrabold text-blue-700">
              {product.price}
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${message}`}
                target="_blank"
                className="flex-1 rounded-xl bg-green-500 py-3 text-center font-bold text-white hover:bg-green-600"
              >
                WhatsApp
              </a>

              <button
                onClick={onClose}
                className="flex-1 rounded-xl border py-3 font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}