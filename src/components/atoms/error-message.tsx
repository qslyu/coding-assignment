import React from "react";
import "./error-message.css";

type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return <span className="error-message">{props.children}</span>;
};

export default ErrorMessage;
