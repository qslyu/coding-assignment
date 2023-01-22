import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../organisms/header";
import "./page-template.css";
import auth from "../../fireabse/auth";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from "../../fireabse/firestore";
import genderIdToString from "../../utils/gender-id-to-string";

type userDataType = {
  avatar: string;
  userName: string;
  dateOfBirth: string;
  gender: string;
};

type ContextType = {
  user: User | null;
  loadingUser: boolean;
  userData: userDataType | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataType | null>>;
};

const PageTemplate: React.FC = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    if (user) {
      (async () => {
        const docRef = doc(db, "user", user.uid);
        const value = await getDoc(docRef);
        if (value.exists()) {
          const data = value.data();

          setUserData({
            avatar: data.avatar,
            userName: data.userName,
            dateOfBirth: data.dateOfBirth.toDate().toLocaleDateString(),
            gender: genderIdToString(data.gender),
          });
        }
      })();
    } else {
      setUserData(null);
    }
  }, [user]);

  return (
    <>
      <Header isLoggedIn={!!user} />
      <main>
        <Outlet context={{ user, loadingUser, userData, setUserData }} />
      </main>
    </>
  );
};

export default PageTemplate;

export function useUser() {
  return useOutletContext<ContextType>();
}
