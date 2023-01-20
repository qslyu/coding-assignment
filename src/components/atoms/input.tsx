import React from "react";
import "./input.css";

type InputProps = {
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  accept?: string;
  min?: string | number;
  max?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
};

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className={`input ${props.error && "input-error"}`}
      name={props.name}
      type={props.type}
      value={props.value}
      accept={props.accept}
      min={props.min}
      max={props.max}
      onChange={props.onChange}
    />
  );
};

export default Input;
