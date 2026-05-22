import { useEffect, useState } from "react";
import { getSetting } from "../services/api";
import logo from "../assets/sinarbaru-logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    getSetting("whatsapp_number").then((data) => {
      setWhatsappNumber(data?.value || "");
    });
  }, []);
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Halo, saya ingin bertanya tentang produk Sinar Baru"
      )}`
    : "#";
//   const whatsappUrl = whatsappNumber
//     ? `https://wa.me/${whatsappNumber}`
//     : "#";

  return (
    <nav className="sticky top-0 z-50 bg-blue-700 text-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sinar Baru Logo" className="h-14 w-auto" />

          <div>
            <h1 className="text-xl font-extrabold leading-none">
              SINAR BARU
            </h1>

            <p className="text-xs font-medium text-blue-100">
              TOKO PLASTIK & KEMASAN
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 font-semibold text-white md:flex">
          {/* <a href="/" className="hover:text-blue-100">
            Beranda
          </a>

          <a href="/products" className="hover:text-blue-100">
            Produk
          </a> */}
          <Link to="/" className="hover:text-blue-100">Beranda</Link>
            <Link to="/products" className="hover:text-blue-100">Produk</Link>
            <Link to="/?scroll=kontak" className="hover:text-blue-100">
            Kontak
            </Link>
          {/* <a href="/#kontak" className="hover:text-blue-100">
            Kontak
          </a> */}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={`rounded-2xl px-6 py-3 font-bold transition ${
            whatsappNumber
              ? "border border-green-300 bg-white text-green-600 hover:bg-green-50"
              : "cursor-not-allowed bg-slate-300 text-slate-500"
          }`}
        >
          WhatsApp Kami
        </a>
      </div>
    </nav>
  );
}