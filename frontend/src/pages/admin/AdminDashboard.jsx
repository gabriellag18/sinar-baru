import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Kelola toko Sinar Baru.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Total Products
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-blue-700">
              4
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Categories
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-blue-700">
              6
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Featured Products
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-blue-700">
              4
            </h2>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}