import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, type, children }) => {
  const buttonClasses = "bg-button-primary text-white px-8 py-2 rounded-md";

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
