import React, { useState } from "react";
import "../styles/loginregister.css";

export default function Register({ onSwitch }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:8000/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Account created!");
      onSwitch(); // Switch to login
    } else {
      alert(data.message);
    }
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

        <form onSubmit={handleRegister}>
          <h1>Register</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn0 marginn">
            Create Account
          </button>

          <div className="register-link">
            <p>
              Already have an account? <a onClick={onSwitch}>Login</a>
            </p>
          </div>
        </form>

        <div className="corner-line"></div>
      </div>
    </>
  );
}
