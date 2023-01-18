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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageTemplate />}>
      <Route path="" element={<Root />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
