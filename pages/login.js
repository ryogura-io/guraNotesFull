import { useState } from "react";
import { useRouter } from "next/router";
import {
  apiLogin,
  apiRegister,
  apiLoginDrawer,
  apiCreateDrawer,
  saveToken,
} from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLoginUser(e) {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await apiLogin(email, password);
    setLoading(false);
    if (res.token) {
      saveToken(res.token);
      router.push("/notes");
    } else alert(res.error || "Login failed");
  }

  async function handleRegisterUser(e) {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await apiRegister(email, password);
    setLoading(false);
    if (res.token) {
      saveToken(res.token);
      router.push("/notes");
    } else alert(res.error || "Registration failed");
  }

  async function handleLoginDrawer(e) {
    e.preventDefault();
    setLoading(true);
    const name = e.target.drawerName.value;
    const password = e.target.password.value;
    const res = await apiLoginDrawer(name, password);
    setLoading(false);
    if (res.token) {
      saveToken(res.token);
      router.push("/notes");
    } else alert(res.error || "Drawer login failed");
  }

  async function handleCreateDrawer(e) {
    e.preventDefault();
    setLoading(true);
    const drawerName = e.target.drawerName.value;
    const password = e.target.password.value;
    const res = await apiCreateDrawer(drawerName, password);
    setLoading(false);
    if (res.token) {
      saveToken(res.token);
      router.push("/notes");
    } else alert(res.error || "Drawer creation failed");
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">🔐 Gura NotesKeeper</h2>

      <div className="row">
        {/* User Section */}
        <div className="col-md-6">
          <h5>User Login</h5>
          <form onSubmit={handleLoginUser}>
            <input name="email" className="form-control mb-2" placeholder="Email" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <button className="btn btn-primary w-100" disabled={loading}>Login</button>
          </form>

          <h5 className="mt-4">Register User</h5>
          <form onSubmit={handleRegisterUser}>
            <input name="email" className="form-control mb-2" placeholder="Email" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <button className="btn btn-success w-100" disabled={loading}>Register</button>
          </form>
        </div>

        {/* Drawer Section */}
        <div className="col-md-6">
          <h5>Drawer Login</h5>
          <form onSubmit={handleLoginDrawer}>
            <input name="drawerName" className="form-control mb-2" placeholder="Drawer Name" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <button className="btn btn-secondary w-100" disabled={loading}>Access Drawer</button>
          </form>

          <h5 className="mt-4">Create Drawer</h5>
          <form onSubmit={handleCreateDrawer}>
            <input name="drawerName" className="form-control mb-2" placeholder="Drawer Name" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <button className="btn btn-success w-100" disabled={loading}>Create Drawer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
