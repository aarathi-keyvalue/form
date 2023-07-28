import React from "react";

const Button = ({
  label,
  type = "button",
  buttonStyles = "",
  onClick,
  disable = false,
}) => {
  return (
    <button
      type={type}
      disabled={disable}
      className={`rounded-md py-2 px-4 w-[90px]  ${
        disable ? "text-white bg-primaryColor/50" : buttonStyles
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
