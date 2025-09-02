// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-4">
      &copy; {new Date().getFullYear()} Pankaj Bhaltilak - Data Analytics. All rights reserved.
    </footer>
  );
};

export default Footer;
