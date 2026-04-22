import { useEffect, useState } from "react";
import { api } from "./api/client";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

const STORAGE_KEY = "internship_auth";

export default function App() {
  const [mode, setMode] = useState("login");
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState({ type: "info", text: "" });

  const token = auth?.token;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    if (!token) {
      setTasks([]);
      return;
    }
    api
      .getTasks(token)
      .then((result) => setTasks(result.data || []))
      .catch((error) => setMessage({ type: "error", text: error.message }));
  }, [token]);

  const handleRegister = async (payload) => {
    try {
      const result = await api.register(payload);
      setAuth(result.data);
      setMessage({ type: "success", text: "Registration successful" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleLogin = async (payload) => {
    try {
      const result = await api.login(payload);
      setAuth(result.data);
      setMessage({ type: "success", text: "Login successful" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const createTask = async (payload) => {
    try {
      const result = await api.createTask(token, payload);
      setTasks((previous) => [result.data, ...previous]);
      setMessage({ type: "success", text: "Task created" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const updateTask = async (id, payload) => {
    try {
      const result = await api.updateTask(token, id, payload);
      setTasks((previous) => previous.map((task) => (task._id === id ? result.data : task)));
      setMessage({ type: "success", text: "Task updated" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(token, id);
      setTasks((previous) => previous.filter((task) => task._id !== id));
      setMessage({ type: "success", text: "Task deleted" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem(STORAGE_KEY);
    setMessage({ type: "info", text: "Logged out" });
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Internship API Test UI</h1>
        {message.text ? (
          <div
            className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : message.type === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            {message.text}
          </div>
        ) : null}
      </div>
      {auth ? (
        <DashboardPage
          user={auth.user}
          tasks={tasks}
          onCreate={createTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onLogout={logout}
        />
      ) : mode === "login" ? (
        <LoginPage onLogin={handleLogin} switchToRegister={() => setMode("register")} />
      ) : (
        <RegisterPage onRegister={handleRegister} switchToLogin={() => setMode("login")} />
      )}
    </main>
  );
}
