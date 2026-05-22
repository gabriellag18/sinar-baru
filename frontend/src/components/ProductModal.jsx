import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductModal({
  product,
  whatsappNumber,
  onClose,
}) {
  const images =
    product?.images?.map((img) => img.image_url) ??
    (product?.image_url ? [product.image_url] : []);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

  if (!product) return null;

  const message = encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product.name}`
  );

  const canWhatsapp = whatsappNumber?.trim();

  const whatsappUrl = canWhatsapp
    ? `https://wa.me/${whatsappNumber}?text=${message}`
    : "#";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold text-slate-400 hover:text-slate-700"
        >
          ✕
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          {/* LEFT */}
          <div>
            <div className="flex h-80 items-center justify-center rounded-3xl bg-blue-50 p-6">
              {images.length > 0 ? (
                <img
                  src={`${API_BASE_URL}${images[selectedImage]}`}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-7xl">🛍️</span>
              )}
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 bg-blue-50 p-2 transition ${
                      selectedImage === index
                        ? "border-blue-700"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={`${API_BASE_URL}${image}`}
                      alt={`Preview ${index}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* dots */}
            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      selectedImage === index
                        ? "bg-blue-700"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-extrabold text-slate-900">
              {product.name}
            </h2>

            <p className="mt-2 text-sm font-semibold text-slate-500">
              {product.categories?.map((c) => c.name).join(", ")}
            </p>

            <p className="mt-6 text-slate-700 leading-7">
              {product.description ||
                "Deskripsi produk belum tersedia."}
            </p>

            <p className="mt-6 text-3xl font-extrabold text-blue-700">
              {product.price}
            </p>

            {/* STOCK */}
            {product.show_stock && (
              <div className="mt-4 inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                Stock tersedia: {product.stock_quantity}
              </div>
            )}

            <div className="mt-auto pt-8">
              <div className="flex gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  onClick={(e) => {
                    if (!canWhatsapp) e.preventDefault();
                  }}
                  className={`flex-1 rounded-xl py-4 text-center font-bold transition ${
                    canWhatsapp
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {canWhatsapp
                    ? "WhatsApp"
                    : "WhatsApp belum diatur"}
                </a>

                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border py-4 font-bold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}