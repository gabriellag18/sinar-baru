import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar({ onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    // <aside className="flex w-64 flex-col bg-blue-800 p-6 text-white">
        
      <div className="flex h-screen w-64 flex-col bg-blue-800 text-white shadow-2xl">
  {/* top */}
  <div className="p-5">
    <h1 className="text-3xl font-extrabold leading-none">
      SINAR BARU
    </h1>

    <p className="mt-1 text-sm text-blue-100">
      Admin Dashboard
    </p>

    <button
      onClick={onClose}
      className="mt-4 rounded-xl bg-white/10 px-4 py-2 font-bold lg:hidden"
    >
      ✕ Close
    </button>
  </div>

  {/* middle nav */}
  <div className="flex-1 space-y-2 px-4">
    <a href="/admin" className="block rounded-xl px-4 py-3 hover:bg-white/10">
      Dashboard
    </a>

    <a
      href="/admin/products"
      className="block rounded-xl px-4 py-3 hover:bg-white/10"
    >
      Products
    </a>

    <a
      href="/admin/categories"
      className="block rounded-xl px-4 py-3 hover:bg-white/10"
    >
      Categories
    </a>

    <a
      href="/admin/finance"
      className="block rounded-xl px-4 py-3 hover:bg-white/10"
    >
      Finance
    </a>

    <a
      href="/admin/settings"
      className="block rounded-xl px-4 py-3 hover:bg-white/10"
    >
      Settings
    </a>
  </div>

  {/* bottom logout */}
  <div className="p-4">
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      }}
      className="w-full rounded-xl bg-white/10 px-4 py-3 font-bold hover:bg-white/20"
    >
      Logout
    </button>
  </div>
</div>
    // </aside>
  );
}