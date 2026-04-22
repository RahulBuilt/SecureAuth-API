export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        No tasks yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">Tasks</h3>
      <ul className="m-0 list-none p-0">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex flex-col gap-3 border-b border-slate-100 py-4 last:border-none sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <strong className="text-base">{task.title}</strong>
              <p className="my-1 text-sm text-slate-600">{task.description || "No description"}</p>
              <small className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Status: {task.status}
              </small>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
