import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import Header from "../organisms/header";
import "./page-template.css";
import auth from "../../fireabse/auth";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../fireabse/firestore";

type userDataType = {
  avatar: string;
  userName: string;
  dateOfBirth: string;
  gendor: string;
};

type ContextType = {
  user: User | null;
  loadingUser: boolean;
  userData: userDataType | null;
};

const PageTemplate: React.FC = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [userData, setUserData] = useState<userDataType>();

  useEffect(() => {
    if (user) {
      (async () => {
        const docRef = doc(db, "user", user.uid);
        const value = await getDoc(docRef);
        if (value.exists()) {
          const data = value.data();
          let gendor = "";
          switch (data.gendor) {
            case 0:
              gendor = "未回答";
              break;
            case 1:
              gendor = "男性";
              break;
            case 2:
              gendor = "女性";
              break;
            case 9:
              gendor = "その他";
              break;
          }

          setUserData({
            avatar: data.avatar,
            userName: data.userName,
            dateOfBirth: data.dateOfBirth.toDate().toLocaleDateString(),
            gendor: gendor,
          });
        }
      })();
    }
  });

  return (
    <>
      <Header isLoggedIn={!!user} />
      <main>
        <Outlet context={{ user, loadingUser, userData }} />
      </main>
    </>
  );
};

export default PageTemplate;

export function useUser() {
  return useOutletContext<ContextType>();
}
