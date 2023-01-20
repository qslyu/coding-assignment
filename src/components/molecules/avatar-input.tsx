import React, { useState } from "react";
import Avatar from "../atoms/avatar";
import "./avatar-input.css";

type AvatarInputProps = {
  currentSrc: string;
  setAvatarImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

const AvatarInput: React.FC<AvatarInputProps> = (props) => {
  const [src, setSrc] = useState(props.currentSrc);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files === null) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result == "string") setSrc(result);
    };
    reader.readAsDataURL(file);
    props.setAvatarImageFile(file);
  };

  return (
    <div className="avatar-input">
      <Avatar src={src} size="large" />
      <label>
        変更する
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

export default AvatarInput;
