import PropTypes from "prop-types";

export function Input({ type = "text", placeholder, className, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
