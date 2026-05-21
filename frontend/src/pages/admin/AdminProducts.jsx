import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
  uploadProductImage,
} from "../../services/api";

const API_BASE_URL = "http://localhost:8000";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    is_featured: true,
    category_id: "",
  });

  function loadData() {
    Promise.all([getProducts(), getCategories()]).then(
      ([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      }
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description ?? "",
      image_url: product.image_url ?? "",
      is_featured: product.is_featured,
      category_id: product.category.id,
    });
    setIsOpen(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const data = await uploadProductImage(file);

    setForm((prev) => ({
      ...prev,
      image_url: data.image_url,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      category_id: Number(form.category_id),
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await createProduct(payload);
    }

    setIsOpen(false);
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      description: "",
      image_url: "",
      is_featured: true,
      category_id: "",
    });

    loadData();
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    loadData();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Products
          </h1>
          <p className="mt-2 text-slate-500">
            Manage products shown on the website.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({
              name: "",
              price: "",
              description: "",
              image_url: "",
              is_featured: true,
              category_id: "",
            });
            setIsOpen(true);
          }}
          className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
        >
          Add Product
        </button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className="flex h-40 items-center justify-center rounded-2xl bg-blue-50">
              {product.image_url ? (
                <img
                  src={`${API_BASE_URL}${product.image_url}`}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <span className="text-5xl">🛍️</span>
              )}
            </div>

            <h2 className="mt-4 font-extrabold text-slate-900">
              {product.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {product.category.name}
            </p>

            <p className="mt-3 font-bold text-blue-700">
              {product.price}
            </p>

            <p className="mt-2 line-clamp-2 text-sm text-slate-500">
              {product.description}
            </p>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => openEditModal(product)}
                className="flex-1 rounded-xl border py-2 font-bold"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 rounded-xl bg-red-50 py-2 font-bold text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
          >
            <h2 className="text-2xl font-extrabold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <input
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              className="mt-5 w-full rounded-xl border px-4 py-3"
              required
            />

            <input
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="mt-3 w-full rounded-xl border px-4 py-3"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="mt-3 w-full rounded-xl border px-4 py-3"
            />

            <div className="mt-3">
              <label className="block text-sm font-bold text-slate-700">
                Product Image
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

            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="mt-3 w-full rounded-xl border px-4 py-3"
              required
            >
              <option value="">Choose category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
              />
              Featured product
            </label>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-xl bg-blue-700 py-3 font-bold text-white">
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setEditingProduct(null);
                }}
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