import React from "react";
import "./input.css";

type InputProps = {
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  accept?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="input"
      name={props.name}
      type={props.type}
      value={props.value}
      accept={props.accept}
      onChange={props.onChange}
    />
  );
};

export default Input;
