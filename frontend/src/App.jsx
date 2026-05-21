import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import ProductSection from "./components/ProductSection";
import { getProducts } from "./services/api";
import FeatureBanner from "./components/FeatureBanner";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch(() => {
        setError("Gagal mengambil data produk.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <FeatureBanner />
      <CategorySection />
      <ProductSection
        products={products}
        loading={loading}
        error={error}
      />
    </main>
  );
}