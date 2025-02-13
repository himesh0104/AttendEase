// card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`p-4 border-b border-gray-700 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold text-gray-100 ${className}`}>{children}</h2>;
}
