import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

type NavigationButtonProps = {
  to: string;
  variant: "contained" | "outlined";
  children: React.ReactNode;
};

const NavigationButton: React.FC<NavigationButtonProps> = (props) => {
  return (
    <Link className={`button ${props.variant}`} to={props.to}>
      {props.children}
    </Link>
  );
};

export default NavigationButton;
