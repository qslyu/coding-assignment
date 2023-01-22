import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/button";
import ErrorMessage from "../components/atoms/error-message";
import Card from "../components/molecules/card";
import FormGroup from "../components/molecules/form-group";
import { useUser } from "../components/templates/page-template";
import auth from "../fireabse/auth";
import errorCodeToMessage from "../fireabse/error-code-to-message";
import { ValidateEmail } from "../utils/validate";

const Login: React.FC = () => {
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

    setFormValues({
      ...formValues,
      [name]: { value: value, error: error },
    });
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsProcessing(true);

    await signInWithEmailAndPassword(
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
      navigate("/profile");
    }
  }, [user]);

  return (
    <Card>
      <h1>ログイン</h1>
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
      <ErrorMessage>{error}</ErrorMessage>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={
          !(formValues.email.value && formValues.password.value) ||
          !!formValues.email.error ||
          !!formValues.password.error ||
          isProcessing
        }
      >
        {!isProcessing ? "ログイン" : "送信中"}
      </Button>
    </Card>
  );
};

export default Login;
