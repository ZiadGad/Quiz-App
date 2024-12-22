import React from "react";

const Button = ({ onClick, text, disabled, icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200
        ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
