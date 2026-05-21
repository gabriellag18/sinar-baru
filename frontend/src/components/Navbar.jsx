import logo from "../assets/sinarbaru-logo.png";

export default function Navbar() {
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
        <a href="/" className="hover:text-blue-100">
            Beranda
        </a>

        <a href="/products" className="hover:text-blue-100">
            Produk
        </a>

        <a href="#kontak" className="hover:text-blue-100">
            Kontak
        </a>
        </div>

        <a
          href="https://wa.me/"
          className="rounded-2xl border border-green-300 bg-white px-6 py-3 font-bold text-green-600 transition hover:bg-green-50"        
        >
          WhatsApp Kami
        </a>
      </div>
    </nav>
  );
}