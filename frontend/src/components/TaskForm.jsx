import { useEffect, useState } from "react";

const defaultForm = { title: "", description: "", status: "todo" };

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(editingTask || defaultForm);

  useEffect(() => {
    setForm(editingTask || defaultForm);
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">{editingTask ? "Update Task" : "Create Task"}</h3>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="mb-3 min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="min-w-28 flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {editingTask ? "Save" : "Add Task"}
        </button>
        {editingTask ? (
          <button
            type="button"
            onClick={onCancel}
            className="min-w-28 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
