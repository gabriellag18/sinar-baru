import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getSetting, updateSetting } from "../../services/api";

export default function AdminSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [saved, setSaved] = useState(false);
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
        setWhatsappNumber(wa.value);
        setStoreAddress(address.value);
        setStoreEmail(email.value);
        setStorePhone(phone.value);
        setShopeeUrl(shopee.value);
        setShopeeName(shopeeName?.value || "");
    });
    }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await Promise.all([
    updateSetting("whatsapp_number", whatsappNumber),
    updateSetting("store_address", storeAddress),
    updateSetting("store_email", storeEmail),
    updateSetting("store_phone", storePhone),
    updateSetting("shopee_url", shopeeUrl),
    updateSetting("shopee_name", shopeeName),
    ]);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-extrabold text-slate-900">
        Settings
      </h1>

      <p className="mt-2 text-slate-500">
        Manage website settings.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-xl rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="space-y-5">
        {/* whatsapp */}
        <div>
            <label className="mb-2 block font-bold text-slate-700">
            WhatsApp Number
            </label>

            <input
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="628123456789"
            className="w-full rounded-xl border px-4 py-3"
            />

            <p className="mt-2 text-sm text-slate-500">
            Use country code without + or spaces.
            Example: 628123456789
            </p>
        </div>

        {/* address */}
        <div>
            <label className="mb-2 block font-bold text-slate-700">
            Store Address
            </label>

            <input
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
            placeholder="Jl. Tinumbu No. 244..."
            className="w-full rounded-xl border px-4 py-3"
            />

            <p className="mt-2 text-sm text-slate-500">
            This address appears on contact section and map.
            </p>
        </div>

        {/* email */}
        <div>
            <label className="mb-2 block font-bold text-slate-700">
            Store Email
            </label>

            <input
            value={storeEmail}
            onChange={(e) => setStoreEmail(e.target.value)}
            placeholder="tokosinarbaru@gmail.com"
            className="w-full rounded-xl border px-4 py-3"
            />

            <p className="mt-2 text-sm text-slate-500">
            Customer inquiries will use this email.
            </p>
        </div>

        {/* shopee name */}
        <div>
            <label className="mb-2 block font-bold text-slate-700">
            Shopee Store Name
            </label>

            <input
            value={shopeeName}
            onChange={(e) => setShopeeName(e.target.value)}
            placeholder="Sinar Baru Official"
            className="w-full rounded-xl border px-4 py-3"
            />

            <p className="mt-2 text-sm text-slate-500">
            Displayed in the contact section.
            </p>
        </div>

        {/* shopee url */}
        <div>
            <label className="mb-2 block font-bold text-slate-700">
            Shopee URL
            </label>

            <input
            value={shopeeUrl}
            onChange={(e) => setShopeeUrl(e.target.value)}
            placeholder="https://shopee.co.id/..."
            className="w-full rounded-xl border px-4 py-3"
            />

            <p className="mt-2 text-sm text-slate-500">
            Full Shopee store link.
            </p>
        </div>
        </div>
        {saved && (
          <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-bold text-green-700">
            Settings saved.
          </p>
        )}

        <button className="mt-5 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">
          Save Settings
        </button>
      </form>
    </AdminLayout>
  );
}