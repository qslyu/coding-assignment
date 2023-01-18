import React from "react";
import { Outlet } from "react-router-dom";

const PageTemplate: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PageTemplate;
