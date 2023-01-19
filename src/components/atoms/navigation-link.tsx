import React from "react";
import { Link } from "react-router-dom";
import "./navigation-link.css";

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
};

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  return (
    <Link className="navigation-link" to={props.to}>
      {props.children}
    </Link>
  );
};

export default NavigationLink;
