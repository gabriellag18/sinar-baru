import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <aside className="flex w-64 flex-col bg-blue-800 p-6 text-white">
      <div>
        <h1 className="text-2xl font-extrabold">
          SINAR BARU
        </h1>

        <p className="mt-1 text-sm text-blue-200">
          Admin Dashboard
        </p>

        <nav className="mt-10 space-y-2">
          <Link
            to="/admin"
            className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
          >
            Products
          </Link>

          <Link
            to="/admin/categories"
            className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
          >
            Categories
          </Link>

          <Link
            to="/admin/finance"
            className="block rounded-xl px-4 py-3 font-semibold hover:bg-blue-700"
          >
            Finance
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto rounded-xl bg-white/10 px-4 py-3 text-left font-bold hover:bg-white/20"
      >
        Logout
      </button>
    </aside>
  );
}