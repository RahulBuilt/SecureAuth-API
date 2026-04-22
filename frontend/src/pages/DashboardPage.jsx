import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function DashboardPage({ user, tasks, onCreate, onUpdate, onDelete, onLogout }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (payload) => {
    if (editingTask) {
      onUpdate(editingTask._id, payload);
      setEditingTask(null);
      return;
    }
    onCreate(payload);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
            <p className="text-sm text-slate-600">
              Logged in as <strong>{user.role}</strong>
            </p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>
      <TaskForm onSubmit={handleSubmit} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={onDelete} />
    </div>
  );
}
