// src/components/Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";


export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await registerUser({ userName, password });
      setMessage(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/"), 1500); // go to login after success
    } catch (err) {
      setMessage(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <a href="/" className="text-primary" onClick={() => navigate("/")}>
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
