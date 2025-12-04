import React, { useState } from "react";
import "../styles/loginregister.css";

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  console.log("Sending login:", email, password);

  const res = await fetch("http://localhost:8000/api/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log("Response:", data);

  if (data.success) {
    alert("Logged in successfully!");
    window.location.reload();
  } else {
    alert(data.message);
  };

  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <div className="wrapper glass">
        <div className="close glass">
          <div className="red"></div>
          <div className="yellow"></div>
          <div className="green"></div>
        </div>

        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock"></i>
          </div>

          <div className="remember-forgot">
            <label className="inline">
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn0">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="#" onClick={onSwitch}>Register</a>
            </p>
          </div>
        </form>

        <div className="corner-line"></div>
      </div>
    </>
  );
}
