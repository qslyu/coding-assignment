import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Avatar from "../components/atoms/avatar";
import Card from "../components/molecules/card";
import db from "../fireabse/firestore";
import auth from "../fireabse/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    avatar: "",
    userName: "",
    dateOfBirth: new Date(),
    gendor: -1,
  });
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email ? user.email : "";

        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          const avatar = data.avatar;
          const userName = data.userName;
          const dateOfBirth = data.dateOfBirth;
          const gendor = data.gendor;

          if (
            avatar === undefined ||
            userName === undefined ||
            dateOfBirth === undefined ||
            gendor === undefined
          ) {
            navigate("/signup/create-profile");
          } else {
            setUserData({
              email: email,
              avatar: avatar,
              userName: userName,
              dateOfBirth: dateOfBirth.toDate(),
              gendor: gendor,
            });
          }
        } else {
          navigate("/");
        }
      } else {
        navigate("/login");
        return;
      }
    });
  }, []);

  return (
    <Card>
      <Avatar size="medium" src={userData.avatar} />
      <h3>{userData.userName}</h3>
      <ul>
        <li>メールアドレス: {userData.email}</li>
        <li>生年月日: {userData.dateOfBirth.toLocaleDateString()}</li>
        <li>
          性別: {userData.gendor == 0 && "解答しない"}
          {userData.gendor == 1 && "男性"}
          {userData.gendor == 2 && "女性"}
          {userData.gendor == 9 && "その他"}
        </li>
      </ul>
    </Card>
  );
};

export default Profile;
