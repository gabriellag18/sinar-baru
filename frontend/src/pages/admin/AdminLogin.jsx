import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem("admin_token", data.access_token);
      navigate("/admin");
    } catch {
      setError("Username atau password salah.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-extrabold text-blue-700">
          Admin Login
        </h1>

        <p className="mt-2 text-slate-500">
          Masuk untuk mengelola produk Sinar Baru.
        </p>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="mt-6 block text-sm font-bold text-slate-700">
          Username
        </label>
        <input
          className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-4 block text-sm font-bold text-slate-700">
          Password
        </label>
        <input
          type="password"
          className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full rounded-xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800">
          Login
        </button>
      </form>
    </main>
  );
}