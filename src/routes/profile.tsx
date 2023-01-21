import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/atoms/avatar";
import Card from "../components/molecules/card";
import { useUser } from "../components/templates/page-template";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, loadingUser, userData } = useUser();

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login");
    }
    if (
      userData &&
      (!userData.avatar ||
        !userData.userName ||
        !userData.dateOfBirth ||
        !userData.gender)
    ) {
      navigate("/signup/create-profile");
    }
  }, [user, loadingUser, userData]);

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
        <li>性別: {userData?.gender}</li>
      </ul>
    </Card>
  );
};

export default Profile;
