// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "bi bi-speedometer2" },
    { name: "CSV Upload", path: "/upload", icon: "bi bi-upload" },
    { name: "Data", path: "/logs", icon: "bi bi-journal-text" },
  ];

  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <h4 className="mb-4">Menu</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link text-white d-flex align-items-center mb-2 ${
                location.pathname === item.path ? "active bg-primary" : ""
              }`}
            >
              <i className={`${item.icon} me-2`}></i>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
