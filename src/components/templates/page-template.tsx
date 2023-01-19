import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../organisms/header";

const PageTemplate: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PageTemplate;
