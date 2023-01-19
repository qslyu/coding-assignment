import React from "react";
import "./button.css";

type ButtonProps = {
  variant: "contained" | "outlined";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={`button ${props.variant}`}>{props.children}</button>
  );
};

export default Button;
