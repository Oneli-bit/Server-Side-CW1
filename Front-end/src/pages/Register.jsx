import { useState } from "react";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const API_BASE = "http://localhost:5001";

  const handleRegister = async () => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <div className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
