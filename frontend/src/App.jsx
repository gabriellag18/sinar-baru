import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import AdminFinance from "./pages/admin/AdminFinance";

import ProtectedRoute from "./components/admin/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/finance"
          element={
            <ProtectedRoute>
              <AdminFinance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<ProductCatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
}