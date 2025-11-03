// src/pages/Dashboard.js
import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="container mt-5">
      <h2>Welcome, {user}! 🎉</h2>
      <p>This is your dashboard.</p>
    </div>
  );
}
