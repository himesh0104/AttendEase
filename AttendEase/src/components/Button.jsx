import PropTypes from "prop-types";
import clsx from "clsx";

export function Button({ children, className, onClick, type = "button", variant = "primary" }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition duration-300";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-700 text-white hover:bg-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "outline"]),
};
