import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getSetting, updateSetting } from "../../services/api";

export default function AdminSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    getSetting("whatsapp_number").then((data) => {
      setWhatsappNumber(data.value);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateSetting("whatsapp_number", whatsappNumber);
    alert("Settings saved");
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-extrabold text-slate-900">
        Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-xl rounded-3xl bg-white p-6 shadow-sm"
      >
        <label className="font-bold text-slate-700">
          WhatsApp Number
        </label>

        <input
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="628123456789"
          className="mt-3 w-full rounded-xl border px-4 py-3"
        />

        <p className="mt-2 text-sm text-slate-500">
          Use country code, example: 628123456789
        </p>

        <button className="mt-5 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">
          Save Settings
        </button>
      </form>
    </AdminLayout>
  );
}