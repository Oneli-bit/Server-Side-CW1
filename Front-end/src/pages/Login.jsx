import { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import "../styles/auth.css";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { apiKey, setApiKey } = useContext(AuthContext);
  const API_BASE = "http://localhost:5001";

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    });
    const data = await res.json();
    if (data.api_key) {
      setApiKey(data.api_key); // Save API key in context
    }
    alert(data.message || data.error);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <div className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={loginForm.username}
          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <button className="btn" onClick={handleLogin}>Login</button>
      </div>
      {apiKey && (
        <div className="api-key-debug">
          <p><strong>Debug:</strong> Your API Key is:</p>
          <p>{apiKey}</p>
        </div>
      )}
    </div>
  );
}

