import { Link } from "react-router-dom";
import { useState } from "react";
import { Home, UploadFile, Report, Info } from "@mui/icons-material"; // Import icons

const Navbar = () => {
  return (
    <nav
      style={{
        background: "linear-gradient(to left, blue,black)",
        padding: "15px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Logo */}
      <Link
        to="/healthcare"
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        MED-Shield
      </Link>

      {/* Navigation Links */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "25px",
          margin: 0,
          padding: 0,
        }}
      >
        <NavItem to="/healthcare" icon={<Home />} label="Home" />
        <NavItem to="/contact" icon={<UploadFile />} label="Share Records" />
        <NavItem to="/Report" icon={<Report />} label="Report" />
        <NavItem to="/Instructions" icon={<Info />} label="Instructions" />
        <NavItem to="/RiskPredictor" label="RiskPredictor" />
        <NavItem to="/MedicalInsurancePrediction" label="MedicalInsurancePrediction" />
         

      </ul>
    </nav>
  );
};

// Reusable Nav Item Component
const NavItem = ({ to, icon, label }) => {
  return (
    <li>
      <Link
        to={to}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          color: "white",
          fontSize: "18px",
          transition: "color 0.3s ease",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
        onMouseEnter={(e) => (e.target.style.color = "yellow")}
        onMouseLeave={(e) => (e.target.style.color = "white")}
      >
        {icon} {label}
      </Link>
    </li>
  );
};

export default Navbar;
