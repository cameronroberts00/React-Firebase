import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,error,isPending}=useLogin()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email,password)
  };
  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>passsword</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      {!isPending&&<button className="btn">Login</button>}
      {isPending&& <button className="btn" disabled>Loading...</button>}
      {error&&<p>{error}</p>}
    </form>
  );
}

