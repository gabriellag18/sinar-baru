import heroProducts from "../assets/hero-products.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-sky-100">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-0 top-24 h-80 w-80 -translate-x-1/2 rotate-45 bg-blue-100" />
        <div className="absolute right-0 top-20 h-96 w-96 translate-x-1/3 rotate-45 bg-sky-200" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
        <div>
          <p className="inline-block rounded-full border border-blue-600 bg-white px-5 py-2 text-sm font-bold text-blue-700">
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
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
        {/* <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"> */}
            <span>📍</span>
            <span>Jl. Tinumbu No. 244, Makassar</span>
        {/* </div> */}

        {/* <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <span>🕒</span>
            <span>Buka Setiap Hari</span>
        </div> */}
        </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["🛡️", "Produk Lengkap", "Aneka pilihan"],
              ["🏷️", "Harga Bersahabat", "Kualitas terjamin"],
              ["🚚", "Layanan Terpercaya", "Siap melayani Anda"],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
              >
                  {icon}

                <div>
                  <p className="font-bold text-blue-700">{title}</p>
                  <p className="text-sm text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="/products"
              className="rounded-xl bg-blue-700 px-7 py-4 font-bold text-white shadow hover:bg-blue-800"
            >
              🛍️ Lihat Produk
            </a>

            <Link
            to="/?scroll=kontak"
            className="rounded-xl border border-blue-700 bg-white px-7 py-4 font-bold text-blue-700 hover:bg-blue-50"
            >
            Kontak Kami
            </Link>
          </div>
        </div>

<div className="relative pt-6 lg:pt-10">
  <div className="relative h-[230px] overflow-visible rounded-[2rem] border-4 border-white bg-blue-700 shadow-2xl sm:h-[300px] lg:h-[360px]">
    <img
      src={heroProducts}
      alt="Produk plastik Sinar Baru"
      className="absolute -bottom-10 left-1/2 z-10 w-[112%] max-w-[460px] -translate-x-1/2 object-contain sm:-bottom-12 sm:w-[110%] sm:max-w-[620px] lg:-bottom-20 lg:w-[128%] lg:max-w-none"
    />
  </div>

  <div className="relative z-20 mx-auto -mt-6 w-[94%] rounded-3xl bg-white p-5 shadow-2xl sm:-mt-12 sm:p-6 lg:-mt-6 lg:w-[92%] lg:p-7">
<div className="grid gap-5">
          <div>
        <h3 className="text-lg font-extrabold text-slate-950 lg:text-xl">
          TERSEDIA :
        </h3>

<div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700 lg:grid-cols-4 lg:text-base">          <p>✓ Aneka Plastik</p>
          <p>✓ Styrofoam Makanan</p>
          <p>✓ Mika</p>
          <p>✓ Sedotan, Sendok</p>
          <p>✓ Thinwall</p>
          <p>✓ Kertas Nasi</p>
          <p>✓ Gelas Plastik</p>
          <p>✓ DLL</p>
        </div>
      </div>

      {/* <div className="hidden space-y-5 border-slate-200 lg:block lg:border-l lg:pl-7">
        <div>
          <p className="font-extrabold text-slate-900">📦 Barang Lengkap</p>
          <p className="text-sm text-slate-500">Semua kebutuhan ada</p>
        </div>

        <div>
          <p className="font-extrabold text-slate-900">🏷️ Harga Bersaing</p>
          <p className="text-sm text-slate-500">Lebih hemat untuk usaha</p>
        </div>

        <div>
          <p className="font-extrabold text-slate-900">🏅 Layanan Terpercaya</p>
          <p className="text-sm text-slate-500">Kepuasan pelanggan prioritas</p>
        </div>
      </div> */}
    </div>
  </div>
</div>
      </div>
    </section>
  );
}