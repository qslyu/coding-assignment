import React from "react";
import NavigationButton from "../atoms/navigation-button";
import NavigationLink from "../atoms/navigation-link";
import "./header.css";

const Header: React.FC = () => {
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
