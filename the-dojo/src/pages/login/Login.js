import "./Login.css";
import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
    // console.log(email, password);
  };

  return (
    <form className="auth-form">
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isPending && (
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      )}

      {isPending && <button className="btn">Loading...</button>}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
