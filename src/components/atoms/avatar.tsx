import React from "react";
import "./avatar.css";

type AvatarProps = {
  src: string;
  size: "large" | "medium" | "small";
};

const Avatar: React.FC<AvatarProps> = (props) => {
  return <img className={`avatar avatar-${props.size}`} src={props.src} />;
};

export default Avatar;
