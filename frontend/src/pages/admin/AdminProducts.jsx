import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

const emptyForm = {
  name: "",
  price: "",
  description: "",
  stock_quantity: 0,
  show_stock: false,
  image_urls: [],
  is_featured: true,
  category_ids: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

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

  function openAddModal() {
    setEditingProduct(null);
    setForm(emptyForm);
    setIsOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description ?? "",
      stock_quantity: product.stock_quantity ?? 0,
      show_stock: product.show_stock ?? false,
      image_urls:
        product.images?.map((image) => image.image_url) ??
        (product.image_url ? [product.image_url] : []),
      is_featured: product.is_featured,
      category_ids: product.categories?.map((c) => c.id) ?? [],
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

  function toggleCategory(categoryId) {
    setForm((prev) => {
      const exists = prev.category_ids.includes(categoryId);

      return {
        ...prev,
        category_ids: exists
          ? prev.category_ids.filter((id) => id !== categoryId)
          : [...prev.category_ids, categoryId],
      };
    });
  }

  async function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadedImages = [];

    for (const file of files) {
      const data = await uploadProductImage(file);
      uploadedImages.push(data.image_url);
    }

    setForm((prev) => ({
      ...prev,
      image_urls: [...prev.image_urls, ...uploadedImages],
    }));

    e.target.value = "";
  }

  function removeImage(index) {
    setForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      category_ids: form.category_ids.map(Number),
      stock_quantity: Number(form.stock_quantity),
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
      toast.success("Product updated");
    } else {
      await createProduct(payload);
      toast.success("Product created");
    }

    setIsOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
    loadData();
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    toast.success("Product deleted");
    loadData();
  }

  const filteredProducts = [...products]
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "price-low") {
        return (
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, ""))
        );
      }

      if (sortBy === "price-high") {
        return (
          parseInt(b.price.replace(/\D/g, "")) -
          parseInt(a.price.replace(/\D/g, ""))
        );
      }

      if (sortBy === "stock-low") {
        return (a.stock_quantity ?? 0) - (b.stock_quantity ?? 0);
      }

      if (sortBy === "stock-high") {
        return (b.stock_quantity ?? 0) - (a.stock_quantity ?? 0);
      }

      return 0;
    });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Products</h1>
          <p className="mt-2 text-slate-500">
            Atur products terlihat pada website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
        >
          Tambah Product
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product name..."
          className="w-full max-w-md rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-600"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border bg-white px-4 py-3 font-medium outline-none focus:border-blue-600"
        >
          <option value="name">Sort: Name</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="stock-low">Stock: Low → High</option>
          <option value="stock-high">Stock: High → Low</option>
        </select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => {
          const coverImage =
            product.images?.[0]?.image_url ?? product.image_url ?? "";

          return (
            <div
              key={product.id}
              className="rounded-3xl bg-white p-5 shadow-sm"
            >
              <div className="flex h-40 items-center justify-center rounded-2xl bg-blue-50">
                {coverImage ? (
                  <img
                    src={`${API_BASE_URL}${coverImage}`}
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
                {product.categories?.map((c) => c.name).join(", ")}
              </p>

              <p className="mt-3 font-bold text-blue-700">{product.price}</p>

              <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                {product.description}
              </p>
              <p className="mt-2 text-sm font-bold text-slate-600">
                Stock: {product.stock_quantity ?? 0}
              </p>

              <p className="text-xs font-semibold text-slate-400">
                {product.show_stock ? "Terlihat oleh pelanggan" : "Tak terlihat oleh pelanggan"}
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
          );
        })}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <form
            onSubmit={handleSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-8 shadow-xl"
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
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Stock Quantity
              </label>

              <input
                type="number"
                name="stock_quantity"
                value={form.stock_quantity}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
                min="0"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 rounded-2xl border px-4 py-3">
                <input
                  type="checkbox"
                  name="show_stock"
                  checked={form.show_stock}
                  onChange={handleChange}
                />

                <span className="font-semibold text-slate-700">
                  Perlihatkan stock ke customers
                </span>
              </label>
            </div>
          </div>
            <div className="mt-3">
              <label className="block text-sm font-bold text-slate-700">
                Foto Product
              </label>

              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-6 text-center hover:bg-blue-100">
                <span className="text-3xl">📷</span>
                <span className="mt-2 font-bold text-blue-700">
                  Click to upload images
                </span>
                <span className="mt-1 text-sm text-slate-500">
                  PNG, JPG, or JPEG
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {form.image_urls.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {form.image_urls.map((imageUrl, index) => (
                    <div
                      key={`${imageUrl}-${index}`}
                      className="relative rounded-2xl bg-blue-50 p-2"
                    >
                      <img
                        src={`${API_BASE_URL}${imageUrl}`}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full rounded-xl object-contain"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm font-bold text-slate-700">Categories</p>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={form.category_ids.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

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
                  setForm(emptyForm);
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