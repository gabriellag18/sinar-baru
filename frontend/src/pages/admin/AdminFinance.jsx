import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AdminLayout from "../../components/admin/AdminLayout";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../../services/api";

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  type: "income",
  action: "sell",
  amount: "",
  category: "",
  description: "",
};

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function AdminFinance() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [year, setYear] = useState(new Date().getFullYear());

    function loadTransactions() {
    getTransactions().then((data) => {
        setTransactions(data);

        if (data.length > 0) {
        const latestYear = new Date(data[0].date).getFullYear();
        setYear(latestYear);
        }
    });
    }

  useEffect(() => {
    loadTransactions();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await createTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm(emptyForm);
    loadTransactions();
  }

  async function handleDelete(id) {
    await deleteTransaction(id);
    loadTransactions();
  }

  const filteredByYear = useMemo(() => {
    return transactions.filter(
      (t) => new Date(t.date).getFullYear() === Number(year)
    );
  }, [transactions, year]);

  const summary = useMemo(() => {
    const income = filteredByYear
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredByYear
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      profit: income - expense,
    };
  }, [filteredByYear]);

  const chartData = useMemo(() => {
    return monthNames.map((month, index) => {
      const monthTransactions = filteredByYear.filter(
        (t) => new Date(t.date).getMonth() === index
      );

      const income = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month,
        income,
        expense,
        profit: income - expense,
      };
    });
  }, [filteredByYear]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Finance
          </h1>
          <p className="mt-2 text-slate-500">
            Analisis pemasukan, pengeluaran, jual beli, dan keuntungan tiap bulan.
          </p>
        </div>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-xl border bg-white px-4 py-3 font-bold"
        >
            {Array.from(
            new Set([
                new Date().getFullYear(),
                ...transactions.map((t) =>
                new Date(t.date).getFullYear()
                ),
            ])
            )
            .sort((a, b) => b - a)
            .map((y) => (
                <option key={y} value={y}>
                {y}
                </option>
            ))}
        </select>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <FinanceCard label="Income" value={summary.income} />
        <FinanceCard label="Expense" value={summary.expense} />
        <FinanceCard label="Profit" value={summary.profit} />
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900">
          Monthly Analysis
        </h2>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
                <Bar
                dataKey="income"
                name="Pemasukan"
                fill="#2563eb"
                />

                <Bar
                dataKey="expense"
                name="Pengeluaran"
                fill="#ef4444"
                />

                <Bar
                dataKey="profit"
                name="Keuntungan"
                fill="#22c55e"
                />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Tambah Transaksi
          </h2>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-5 w-full rounded-xl border px-4 py-3"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-3 w-full rounded-xl border px-4 py-3"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>

          <select
            name="action"
            value={form.action}
            onChange={handleChange}
            className="mt-3 w-full rounded-xl border px-4 py-3"
          >
            <option value="sell">Jual</option>
            <option value="buy">Beli</option>
            <option value="other">Lainnya</option>
          </select>

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="mt-3 w-full rounded-xl border px-4 py-3"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="mt-3 w-full rounded-xl border px-4 py-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="mt-3 w-full rounded-xl border px-4 py-3"
          />

          <button className="mt-4 w-full rounded-xl bg-blue-700 py-3 font-bold text-white">
            Simpan Transaksi
          </button>
        </form>

        <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-extrabold text-slate-900">
            Histori Transaksi
          </h2>

            <div className="mt-5 max-h-[600px] space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
              {filteredByYear.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-bold text-slate-900">
                    {transaction.description || transaction.category || "Transaction"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {transaction.date} • {transaction.type} • {transaction.action}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-blue-700">
                    Rp {transaction.amount.toLocaleString("id-ID")}
                  </p>

                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="mt-1 text-sm font-bold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function FinanceCard({ label, value }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <h2 className="mt-3 text-4xl font-extrabold text-blue-700">
        Rp {value.toLocaleString("id-ID")}
      </h2>
    </div>
  );
}