import { useState } from "react";

export default function LoginPage({ onLogin, switchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-2xl font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
        className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(event) => setForm({ ...form, password: event.target.value })}
        className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
        required
      />
      <button
        type="submit"
        className="mb-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Sign in
      </button>
      <button
        type="button"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        onClick={switchToRegister}
      >
        Create new account
      </button>
    </form>
  );
}
