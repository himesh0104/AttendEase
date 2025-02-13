// alert.jsx
import React from "react";

export function Alert({ children, className = "" }) {
  return (
    <div className={`p-4 rounded-lg border-l-4 ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-300 ${className}`}>{children}</p>;
}
