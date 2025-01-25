import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-around bg-[#1c2126] p-3 border-t border-[#293038]">
      <Link to="/" className="text-center">
        <p>🏠</p>
        <span>Home</span>
      </Link>
      <Link to="/attendance-overview" className="text-center">
        <p>📅</p>
        <span>Attendance</span>
      </Link>
      <Link to="/profile" className="text-center">
        <p>👤</p>
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default Footer;
