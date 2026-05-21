export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-sky-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-block rounded-full border border-blue-600 px-5 py-2 text-sm font-bold text-blue-700">
            TOKO PLASTIK SINAR BARU
          </p>

          <h2 className="mt-6 text-5xl font-extrabold leading-tight text-slate-950">
            Kebutuhan Plastik dan Kemasan untuk{" "}
            <span className="text-blue-700">Usaha Anda</span>
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Menyediakan berbagai kebutuhan plastik dan kemasan berkualitas
            dengan harga bersaing dan layanan terpercaya.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Produk Lengkap", "Harga Bersahabat", "Layanan Terpercaya"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-xl border bg-white/80 p-4 shadow-sm"
                >
                  <p className="font-bold text-blue-700">{item}</p>
                  <p className="text-sm text-slate-600">Siap melayani Anda</p>
                </div>
              )
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="#produk"
              className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow hover:bg-blue-800"
            >
              Lihat Produk
            </a>

            <a
              href="https://wa.me/"
              className="rounded-xl border border-blue-700 bg-white px-6 py-3 font-bold text-blue-700 hover:bg-blue-50"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border-8 border-white bg-blue-700 p-6 shadow-2xl">
          <div className="flex h-80 items-center justify-center rounded-3xl bg-white/10 text-center text-3xl font-extrabold text-white">
            Plastik • Mika • Sedotan • Dus
          </div>
        </div>
      </div>
    </section>
  );
}