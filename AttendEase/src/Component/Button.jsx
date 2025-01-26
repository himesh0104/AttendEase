import React from 'react';

const Button = ({ label, onClick, type = 'button' }) => {
  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600"
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
