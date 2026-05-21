import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../services/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  function loadCategories() {
    getCategories().then(setCategories);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await createCategory(form);

    setForm({
      name: "",
      description: "",
    });

    loadCategories();
  }

  async function handleDelete(id) {
    await deleteCategory(id);
    loadCategories();
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-extrabold text-slate-900">
        Categories
      </h1>

      <p className="mt-2 text-slate-500">
        Manage product categories.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-extrabold">Add Category</h2>

        <input
          name="name"
          placeholder="Category name"
          value={form.name}
          onChange={handleChange}
          className="mt-5 w-full rounded-xl border px-4 py-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="mt-3 w-full rounded-xl border px-4 py-3"
        />

        <button className="mt-4 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">
          Add Category
        </button>
      </form>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-extrabold text-slate-900">
              {category.name}
            </h2>

            <p className="mt-2 text-slate-500">
              {category.description}
            </p>

            <button
              onClick={() => handleDelete(category.id)}
              className="mt-5 rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}