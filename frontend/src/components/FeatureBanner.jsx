const items = [
  "Aneka Plastik",
  "Mika",
  "Thinwall",
  "Gelas Plastik",
  "Styrofoam Makanan",
  "Sedotan, Sendok",
  "Kertas Nasi",
  "DLL",
];

const benefits = [
  "Barang Lengkap",
  "Harga Bersaing",
  "Layanan Terpercaya",
];

export default function FeatureBanner() {
  return (
    <section className="-mt-10 relative z-10 px-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-blue-700 p-8 text-white shadow-xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-extrabold">TERSEDIA :</h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <p key={item} className="font-semibold">
                  ✓ {item}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl bg-white/10 p-5 text-center"
              >
                <p className="font-bold">{benefit}</p>
                <p className="mt-1 text-sm text-blue-100">
                  Untuk kebutuhan usaha Anda
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}