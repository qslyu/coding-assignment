import React from "react";
import "./card.css";

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
