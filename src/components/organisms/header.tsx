import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../../fireabse/auth";
import Button from "../atoms/button";
import NavigationButton from "../atoms/navigation-button";
import NavigationLink from "../atoms/navigation-link";
import "./header.css";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <header>
      <div className="container">
        <nav className="main-nav">
          <ul>
            <li>
              <NavigationLink to="/">ホーム</NavigationLink>
            </li>
            <li>
              <NavigationLink to="/profile">プロフィール</NavigationLink>
            </li>
          </ul>
        </nav>

        <ul className="auth-container">
          {!isLoggedIn ? (
            <>
              <li>
                <NavigationButton to="/login" variant="outlined">
                  ログイン
                </NavigationButton>
              </li>
              <li>
                <NavigationButton to="/signup" variant="contained">
                  新規登録
                </NavigationButton>
              </li>
            </>
          ) : (
            <li>
              <Button variant="outlined" onClick={() => signOut(auth)}>
                ログアウト
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
