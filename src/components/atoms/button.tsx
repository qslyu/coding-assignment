import React from "react";
import "./button.css";

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant: "contained" | "outlined";
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`button ${props.variant} ${props.disabled && "disabled"}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
