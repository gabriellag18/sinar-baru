export default function Footer() {
  return (
    <footer className="bg-blue-800 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">SINAR BARU</h2>
          <p className="text-blue-100">
            Toko Plastik & Kemasan
          </p>
          <p className="mt-2 text-sm text-blue-100">
            Jl. Tinumbu No. 244, Makassar, Sulawesi Selatan
          </p>
        </div>

        <p className="text-sm text-blue-100">
          © {new Date().getFullYear()} Sinar Baru. All rights reserved.
        </p>
      </div>
    </footer>
  );
}