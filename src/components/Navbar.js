// src/components/Navbar.js
import React from "react";

export default function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">.Net Web Api</span>
        <div className="ms-auto text-white">
          {user ? `👤 ${user}` : "Guest"}
        </div>
      </div>
    </nav>
  );
}
