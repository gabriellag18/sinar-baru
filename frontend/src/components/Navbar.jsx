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

        <div className="hidden gap-8 font-semibold md:flex">
          <a href="#">Beranda</a>
          <a href="#produk">Produk</a>
          <a href="#kategori">Kategori</a>
          <a href="#kontak">Kontak</a>
        </div>

        <a
          href="https://wa.me/"
          className="rounded-xl bg-green-500 px-5 py-3 font-bold text-white hover:bg-green-600"
        >
          WhatsApp Kami
        </a>
      </div>
    </nav>
  );
}