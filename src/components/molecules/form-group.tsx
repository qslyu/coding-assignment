import React from "react";
import ErrorMessage from "../atoms/error-message";
import Input from "../atoms/input";
import "./form-group.css";

type FormGroupProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  value?: string | number;
  accept?: string;
  min?: string | number;
  max?: string | number;
  options?: { label: string; value: number | string }[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

const FormGroup: React.FC<FormGroupProps> = (props) => {
  return (
    <dl className="form-gruop">
      <dt>
        <label>{props.label}</label>
      </dt>
      <dd>
        {props.options ? (
          <div>
            {props.options.map((option) => (
              <div key={option.value}>
                <input
                  name={props.name}
                  type={props.type}
                  value={option.value}
                  onChange={props.onChange}
                />
                <label>{option.label}</label>
              </div>
            ))}
          </div>
        ) : (
          <Input
            type={props.type}
            name={props.name}
            value={props.value}
            accept={props.accept}
            min={props.min}
            max={props.max}
            onChange={props.onChange}
            error={!!props.error}
          />
        )}
        <ErrorMessage>{props.error}</ErrorMessage>
      </dd>
    </dl>
  );
};

export default FormGroup;
