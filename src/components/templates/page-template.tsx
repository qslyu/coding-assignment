import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../organisms/header";
import "./page-template.css";

const PageTemplate: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PageTemplate;
