const API_BASE = "https://guranotesbackend-production.up.railway.app";

export const saveToken = (t) => localStorage.setItem("gura_token", t);
export const getToken = () => localStorage.getItem("gura_token");
export const clearToken = () => localStorage.removeItem("gura_token");
export const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export async function apiRegister(email, password) {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function apiCreateDrawer(drawerName, password) {
  const res = await fetch(`${API_BASE}/api/drawers/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ drawerName, password }),
  });
  return res.json();
}

export async function apiLoginDrawer(drawerName, password) {
  const res = await fetch(`${API_BASE}/api/drawers/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ drawerName, password }),
  });
  return res.json();
}

export async function apiFetchNotes() {
  const res = await fetch(`${API_BASE}/api/notes`, { headers: authHeaders() });
  return res.json();
}

export async function apiCreateNote(title = "", content = "") {
  const res = await fetch(`${API_BASE}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function apiUpdateNote(id, title, content) {
  const res = await fetch(`${API_BASE}/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function apiDeleteNote(id) {
  const res = await fetch(`${API_BASE}/api/notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
}
