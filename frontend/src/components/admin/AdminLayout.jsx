import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        {children}
      </div>
    </main>
  );
}