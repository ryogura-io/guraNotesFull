import { useState } from "react";
import { useRouter } from "next/router";
import {
  apiLogin,
  apiRegister,
  apiLoginDrawer,
  apiCreateDrawer,
  saveToken,
} from "../lib/api";
import { TypingText } from "@/components/animate-ui/text/typing";
import { GradientText } from "@/components/animate-ui/text/gradient";


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
    <div className="container text-light">
      <h2 className="text-center mb-4"><TypingText text="Gura NotesKeeper" cursor={true} loop={true}/> <i class="bi bi-journal-check"></i></h2>

      <div className="row">
        {/* User Section */}
        <div className="col-md-6">
          <h5>User Login <i class="bi bi-person-fill-check"></i></h5>
          <form onSubmit={handleLoginUser}>
            <input name="email" className="form-control mb-2" placeholder="Email" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-primary rounded-0" disabled={loading}><GradientText text="Login"/></button>
            </div>
          </form>

          <h5 className="mt-4">Register User <i class="bi bi-person-plus-fill"></i></h5>
          <form onSubmit={handleRegisterUser}>
            <input name="email" className="form-control mb-2" placeholder="Email" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-success rounded-0" disabled={loading}>Register</button>
            </div>
          </form>
        </div>

        {/* Drawer Section */}
        <div className="col-md-6">
          <h5>Drawer Login <i class="bi bi-folder"></i></h5>
          <form onSubmit={handleLoginDrawer}>
            <input name="drawerName" className="form-control mb-2" placeholder="Drawer Name" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-primary rounded-0" disabled={loading}>Access Drawer</button>
            </div>
          </form>

          <h5 className="mt-4">Create Drawer <i class="bi bi-folder-plus"></i></h5>
          <form onSubmit={handleCreateDrawer}>
            <input name="drawerName" className="form-control mb-2" placeholder="Drawer Name" />
            <input name="password" type="password" className="form-control mb-2" placeholder="Password" />
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-success rounded-0" disabled={loading}>Create Drawer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
