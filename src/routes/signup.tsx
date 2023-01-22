import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/button";
import Card from "../components/molecules/card";
import FormGroup from "../components/molecules/form-group";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../fireabse/auth";
import { ValidateEmail, ValidatePassword } from "../utils/validate";
import ErrorMessage from "../components/atoms/error-message";
import errorCodeToMessage from "../fireabse/errorCodeToMessage";
import { useUser } from "../components/templates/page-template";

const SignUp: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let error = "";

    if (name == "email") error = ValidateEmail(value);
    else if (name == "password") error = ValidatePassword(value);

    setFormValues({
      ...formValues,
      [name]: { value: value, error: error },
    });
  };

  const [isAgree, setIsAgree] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsProcessing(true);

    await createUserWithEmailAndPassword(
      auth,
      formValues.email.value,
      formValues.password.value
    ).catch((error) => {
      setIsProcessing(false);
      setError(errorCodeToMessage(error.code));
      throw error;
    });
  };

  useEffect(() => {
    if (user) {
      setIsProcessing(false);
      navigate("/signup/create-profile");
    }
  }, [user]);

  return (
    <Card>
      <h1>新規登録</h1>
      <FormGroup
        name="email"
        label="メールアドレス"
        type="email"
        onChange={handleInputChange}
        value={formValues.email.value}
        error={formValues.email.error}
      />
      <FormGroup
        name="password"
        label="パスワード"
        type="password"
        onChange={handleInputChange}
        value={formValues.password.value}
        error={formValues.password.error}
      />
      <div>
        <input
          name="isAgree"
          type="checkbox"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIsAgree(event.target.checked);
          }}
          checked={isAgree}
        />
        <label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://menherasenpai.notion.site/457df49475494671807673a0a3346451"
          >
            利用規約
          </a>
          に同意する
        </label>
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={
          !(formValues.email.value && formValues.password.value) ||
          !!formValues.email.error ||
          !!formValues.password.error ||
          !isAgree ||
          isProcessing
        }
      >
        {!isProcessing ? "登録" : "送信中"}
      </Button>
    </Card>
  );
};

export default SignUp;
