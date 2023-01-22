import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/atoms/avatar";
import Card from "../components/molecules/card";
import { useUser } from "../components/templates/page-template";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, loadingUser, userData } = useUser();

  useEffect(() => {
    if (
      user &&
      userData !== null &&
      (userData?.avatar == "" ||
        userData?.dateOfBirth == "" ||
        userData?.gender == "" ||
        userData?.userName == "")
    ) {
      navigate("/signup/create-profile");
    }
  }, [userData]);

  return (
    <Card>
      {user || loadingUser ? (
        userData === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Avatar
              size="medium"
              src={
                userData
                  ? userData.avatar
                  : import.meta.env.VITE_DEFAULT_AVATAR_SRC
              }
            />
            <h3>{userData?.userName}</h3>
            <ul>
              <li>メールアドレス: {user && user.email}</li>
              <li>生年月日: {userData?.dateOfBirth}</li>
              <li>性別: {userData?.gender}</li>
            </ul>
          </>
        )
      ) : (
        <h1>プロフィールを確認するにはログインしてください</h1>
      )}
    </Card>
  );
};

export default Profile;
