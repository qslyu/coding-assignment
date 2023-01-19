import React from "react";
import "./button.css";

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant: "contained" | "outlined";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} className={`button ${props.variant}`}>
      {props.children}
    </button>
  );
};

export default Button;
