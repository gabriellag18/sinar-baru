import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCatalog from "../components/ProductCatalog";
import { getCategories, getProducts } from "../services/api";

export default function ProductCatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch(() => setError("Gagal mengambil data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ProductCatalog
        products={products}
        categories={categories}
        loading={loading}
        error={error}
      />
    </main>
  );
}