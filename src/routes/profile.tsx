import React from "react";
import Avatar from "../components/atoms/avatar";
import Card from "../components/molecules/card";
import { useUser } from "../components/templates/page-template";

const Profile: React.FC = () => {
  const { user, userData } = useUser();

  return (
    <Card>
      <Avatar
        size="medium"
        src={
          userData ? userData.avatar : import.meta.env.VITE_DEFAULT_AVATAR_SRC
        }
      />
      <h3>{userData?.userName}</h3>
      <ul>
        <li>メールアドレス: {user && user.email}</li>
        <li>生年月日: {userData?.dateOfBirth}</li>
        <li>性別: {userData?.gendor}</li>
      </ul>
    </Card>
  );
};

export default Profile;
