import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <section className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
    </main>
  );
}