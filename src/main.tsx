import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import PageTemplate from "./components/templates/page-template";
import Root from "./routes/root";
import "./reset.css";
import "./main.css";
import SignUp from "./routes/signup";
import CreateProfile from "./routes/signup/create-profile";
import Profile from "./routes/profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageTemplate />}>
      <Route path="" element={<Root />} />
      <Route path="signup">
        <Route path="" element={<SignUp />} />
        <Route path="create-profile" element={<CreateProfile />} />
      </Route>
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
