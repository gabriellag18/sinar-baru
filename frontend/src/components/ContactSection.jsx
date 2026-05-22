import { useEffect, useState } from "react";
import { getSetting } from "../services/api";

export default function ContactSection() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [shopeeUrl, setShopeeUrl] = useState("");
  const [shopeeName, setShopeeName] = useState("");

  useEffect(() => {
    Promise.all([
      getSetting("whatsapp_number"),
      getSetting("store_address"),
      getSetting("store_email"),
      getSetting("store_phone"),
      getSetting("shopee_url"),
      getSetting("shopee_name"),
    ]).then(([wa, address, email, phone, shopee, shopeeName]) => {
      setWhatsappNumber(wa?.value || "6585753078");
      setStoreAddress(address?.value || "Jl. Tinumbu No. 244");
      setStoreEmail(email?.value || "gloriagabriella33@gmail.com");
      setStorePhone(phone?.value || "");
      setShopeeUrl(shopee?.value || "shopee.com");
      setShopeeName(shopeeName?.value || "Toko Sinar Baru");
    });
  }, []);

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Halo, saya ingin bertanya tentang produk Sinar Baru"
      )}`
    : "#";

  return (
    <section id="kontak" className="bg-blue-50 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
        <div>
          <p className="font-bold text-blue-700">Hubungi Kami</p>

          <h2 className="mt-2 text-4xl font-extrabold text-slate-900">
            Toko Plastik Sinar Baru
          </h2>

          <div className="mt-8 space-y-4 text-slate-700">
            {storeAddress && <p>📍 {storeAddress}</p>}
            {storeEmail && <p>✉️ {storeEmail}</p>}
            {whatsappNumber && <p>📞 {whatsappNumber}</p>}
            {shopeeUrl && <p>🛒 Shopee : {shopeeName || "Toko Sinar Baru"}</p>}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {whatsappNumber && (
              <a
                href={whatsappUrl}
                target="_blank"
                className="rounded-xl bg-green-500 px-6 py-3 font-bold text-white"
              >
                WhatsApp
              </a>
            )}

            {storeEmail && (
              <a
                href={`mailto:${storeEmail}`}
                className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white"
              >
                Email
              </a>
            )}

            {shopeeUrl && (
              <a
                href={shopeeUrl}
                target="_blank"
                className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
              >
                Shopee
              </a>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <iframe
            title="Toko Plastik Sinar Baru Map"
            src="https://www.google.com/maps?q=Jl.+Tinumbu+No.+244+Makassar&output=embed"
            className="h-[360px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}