import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../fireabse/auth";
import Button from "../atoms/button";
import NavigationButton from "../atoms/navigation-button";
import NavigationLink from "../atoms/navigation-link";
import "./header.css";

type HeaderProps = {
  isLoggedIn: boolean;
};

const Header: React.FC<HeaderProps> = (isLoggedIn) => {
  const navigate = useNavigate();
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
              <Button
                variant="outlined"
                onClick={() => {
                  signOut(auth);
                  navigate("/");
                }}
              >
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
