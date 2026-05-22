import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureBanner from "../components/FeatureBanner";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import { getCategories, getFeaturedProducts } from "../services/api";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const [searchParams] = useSearchParams();

    useEffect(() => {
    if (searchParams.get("scroll") === "kontak") {
        setTimeout(() => {
        document
            .getElementById("kontak")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    }
    }, [searchParams]);

    const location = useLocation();

    useEffect(() => {
    if (location.hash) {
        setTimeout(() => {
        document
            .querySelector(location.hash)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }
    }, [location]);

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
      <ContactSection />
      <Footer />
    </main>
  );
}