import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button";
import ErrorMessage from "../../components/atoms/error-message";
import AvatarInput from "../../components/molecules/avatar-input";
import Card from "../../components/molecules/card";
import FormGroup from "../../components/molecules/form-group";
import uploadAvatarImage from "../../utils/upload-avatar-image";
import db from "../../fireabse/firestore";
import { useUser } from "../../components/templates/page-template";

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formValues, setFormValues] = useState({
    userName: { value: "", error: "" },
    dateOfBirth: { value: "", error: "" },
    gender: { value: "", error: "" },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const error = value ? "" : "入力してください";

    setFormValues({
      ...formValues,
      [name]: { value: value, error: error },
    });
  };

  const [avatarImageFile, setAvatarImageFile] = useState<File>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (user) {
      setIsProcessing(true);
      let avatarImageSrc = "";
      if (avatarImageFile !== undefined) {
        avatarImageSrc = await uploadAvatarImage(user, avatarImageFile).catch(
          (error) => {
            setError("エラーが発生しました。");
            setIsProcessing(false);
            throw error;
          }
        );
      } else {
        avatarImageSrc = import.meta.env.VITE_DEFAULT_AVATAR_SRC;
      }

      const userDocRef = doc(db, "user", user.uid);
      await setDoc(userDocRef, {
        avatar: avatarImageSrc,
        userName: formValues.userName.value,
        dateOfBirth: new Date(formValues.dateOfBirth.value),
        gender: Number(formValues.gender.value),
      }).catch((error) => {
        setError("エラーが発生しました。");
        setIsProcessing(false);
        throw error;
      });

      setIsProcessing(false);
      navigate("/profile");
    }
  };

  return (
    <Card>
      <h1>プロフィール登録</h1>
      <AvatarInput
        currentSrc={import.meta.env.VITE_DEFAULT_AVATAR_SRC}
        setAvatarImageFile={setAvatarImageFile}
      />
      <FormGroup
        label="ユーザー名"
        name="userName"
        type="text"
        onChange={handleInputChange}
        value={formValues.userName.value}
        error={formValues.userName.error}
      />
      <FormGroup
        label="生年月日"
        name="dateOfBirth"
        type="date"
        max={new Date().toLocaleDateString("en-ca")}
        onChange={handleInputChange}
        value={formValues.dateOfBirth.value}
        error={formValues.dateOfBirth.error}
      />
      <FormGroup
        label="性別"
        name="gender"
        type="radio"
        options={[
          { label: "男性", value: 1 },
          { label: "女性", value: 2 },
          { label: "その他", value: 9 },
          { label: "回答しない", value: 0 },
        ]}
        onChange={handleInputChange}
        value={formValues.gender.value}
        error={formValues.gender.error}
      />
      <ErrorMessage>{error}</ErrorMessage>
      <Button
        variant="contained"
        disabled={
          !(
            formValues.userName.value &&
            formValues.dateOfBirth.value &&
            formValues.gender.value
          ) ||
          !!formValues.userName.error ||
          !!formValues.dateOfBirth.error ||
          !!formValues.gender.error ||
          isProcessing
        }
        onClick={handleSubmit}
      >
        {!isProcessing ? "登録" : "送信中"}
      </Button>
    </Card>
  );
};

export default CreateProfile;
