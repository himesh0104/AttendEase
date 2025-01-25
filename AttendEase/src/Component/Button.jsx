import React from "react";

const Button = ({ label, onClick, variant = "primary" }) => {
  const baseClass = "px-6 py-3 rounded-lg font-bold ";
  const variantClass = variant === "primary" ? "bg-[#1980e6] text-white" : "bg-[#243647] text-white";

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass}`}>
      {label}
    </button>
  );
};

export default Button;
