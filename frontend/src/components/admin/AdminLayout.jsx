import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
<main className="min-h-screen bg-slate-100 lg:flex lg:items-stretch">
        <div className="fixed inset-y-0 left-0 z-40 w-16 bg-blue-800 lg:hidden">
    <button
        onClick={() => setSidebarOpen(true)}
        className="mt-5 ml-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-xl font-bold text-white shadow"
    >
        ☰
    </button>
    </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

<section className="flex-1 p-6 pl-24 pt-20 lg:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
      </section>
    </main>
  );
}