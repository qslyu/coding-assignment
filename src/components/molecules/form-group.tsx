import React from "react";
import Input from "../atoms/input";
import "./form-group.css";

type FormGroupProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  accept?: string;
  options?: { label: string; value: number | string }[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
            accept={props.accept}
            onChange={props.onChange}
          />
        )}
      </dd>
    </dl>
  );
};

export default FormGroup;
