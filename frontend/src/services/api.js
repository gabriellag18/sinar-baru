const API_BASE_URL = "http://localhost:8000";
const token = localStorage.getItem("admin_token");

async function request(path, options = {}) {
  const token = localStorage.getItem("admin_token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export function getProducts() {
  return request("/products");
}

export function getFeaturedProducts() {
  return request("/products/featured");
}

export function getCategories() {
  return request("/categories");
}

export function loginAdmin(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function createProduct(product) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id) {
  return request(`/products/${id}`, {
    method: "DELETE",
  });
}

export async function uploadProductImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/product-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return response.json();
}

export function createCategory(category) {
  return request("/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export function deleteCategory(id) {
  return request(`/categories/${id}`, {
    method: "DELETE",
  });
}

export function getTransactions() {
  return request("/finance/transactions");
}

export function createTransaction(transaction) {
  return request("/finance/transactions", {
    method: "POST",
    body: JSON.stringify(transaction),
  });
}

export function deleteTransaction(id) {
  return request(`/finance/transactions/${id}`, {
    method: "DELETE",
  });
}

export async function uploadCategoryImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/uploads/category-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Category image upload failed");

  return response.json();
}

export function updateCategory(id, category) {
  return request(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
}

export function getSetting(key) {
  return request(`/settings/${key}`);
}

export function updateSetting(key, value) {
  return request(`/settings/${key}`, {
    method: "PUT",
    body: JSON.stringify({ value }),
  });
}