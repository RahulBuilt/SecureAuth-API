const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const request = async (path, { method = "GET", body, token } = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  getTasks: (token) => request("/tasks", { token }),
  createTask: (token, payload) => request("/tasks", { method: "POST", body: payload, token }),
  updateTask: (token, id, payload) =>
    request(`/tasks/${id}`, { method: "PATCH", body: payload, token }),
  deleteTask: (token, id) => request(`/tasks/${id}`, { method: "DELETE", token }),
};
