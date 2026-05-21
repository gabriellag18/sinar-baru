import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureBanner from "../components/FeatureBanner";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import { getCategories, getFeaturedProducts } from "../services/api";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getFeaturedProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch(() => setError("Gagal mengambil data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      {/* <FeatureBanner /> */}
      <CategorySection categories={categories} loading={loading} error={error} />
      <ProductSection products={products} loading={loading} error={error} />
    </main>
  );
}