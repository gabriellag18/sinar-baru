import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  uploadCategoryImage,
} from "../../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
  name: "",
  description: "",
  image_url: "",
};

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function loadCategories() {
    getCategories().then(setCategories);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function openAddModal() {
    setEditingCategory(null);
    setForm(emptyForm);
    setIsOpen(true);
  }

  function openEditModal(category) {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description ?? "",
      image_url: category.image_url ?? "",
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEditingCategory(null);
    setForm(emptyForm);
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const data = await uploadCategoryImage(file);

    setForm((prev) => ({
      ...prev,
      image_url: data.image_url,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingCategory) {
      await updateCategory(editingCategory.id, form);
      toast.success("Category updated");
    } else {
      await createCategory(form);
      toast.success("Category created");
    }

    closeModal();
    loadCategories();
  }

  async function handleDelete(id) {
    await deleteCategory(id);
    toast.success("Category deleted");
    loadCategories();
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Categories
          </h1>
          <p className="mt-2 text-slate-500">
            Atur kategori products.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
        >
          Tambah Category
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <div className="flex h-40 items-center justify-center rounded-2xl bg-blue-50">
              {category.image_url ? (
                <img
                  src={`${API_BASE_URL}${category.image_url}`}
                  alt={category.name}
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <span className="text-5xl">📦</span>
              )}
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              {category.name}
            </h2>

            <p className="mt-2 text-slate-500">
              {category.description}
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => openEditModal(category)}
                className="flex-1 rounded-xl border py-2 font-bold"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(category.id)}
                className="flex-1 rounded-xl bg-red-50 py-2 font-bold text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
          >
            <h2 className="text-2xl font-extrabold">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

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

            <div className="mt-4">
              <label className="block text-sm font-bold text-slate-700">
                Category Image
              </label>

              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-6 text-center hover:bg-blue-100">
                <span className="text-3xl">📷</span>
                <span className="mt-2 font-bold text-blue-700">
                  Click to upload image
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  PNG, JPG, or JPEG
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {form.image_url && (
                <img
                  src={`${API_BASE_URL}${form.image_url}`}
                  alt="Preview"
                  className="mt-3 h-32 w-full rounded-xl bg-blue-50 object-contain p-3"
                />
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-xl bg-blue-700 py-3 font-bold text-white">
                Save
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="flex-1 rounded-xl border py-3 font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}