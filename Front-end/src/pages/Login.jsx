// src/pages/Login.jsx
import { useState } from "react";
import "../styles/auth.css";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [apiKey, setApiKey] = useState("");
  const API_BASE = "http://localhost:5001";

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    });
    const data = await res.json();
    if (data.api_key) {
      setApiKey(data.api_key);
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
        {apiKey && <p className="api-key">API Key: {apiKey}</p>}
      </div>
    </div>
  );
}

// // to authcontext
// import { useState, useContext } from "react";
// import { AuthContext } from "/Users/onelividusika/Desktop/Server Side/CW1/AuthContext.jsx";
// import "../styles/auth.css";

// export default function Login() {
//   const [loginForm, setLoginForm] = useState({ username: "", password: "" });
//   const { setApiKey } = useContext(AuthContext);
//   const API_BASE = "http://localhost:5001";

//   const handleLogin = async () => {
//     const res = await fetch(`${API_BASE}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginForm)
//     });
//     const data = await res.json();
//     if (data.api_key) {
//       setApiKey(data.api_key); // set the API key in the context
//     }
//     alert(data.message || data.error);
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <div className="auth-form">
//         <input
//           type="text"
//           placeholder="Username"
//           value={loginForm.username}
//           onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={loginForm.password}
//           onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
//         />
//         <button className="btn" onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   );
// }
