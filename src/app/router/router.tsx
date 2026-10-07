import { createBrowserRouter } from "react-router-dom";
import Layout from "@app/Layout";
import { AuthPage, AuthVerifyPage } from "@pages/AuthPage";
import { HomePage } from "@pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "auth/verify", element: <AuthVerifyPage /> },
      { path: "*", element: <div>ооо</div> },
    ],
  },
]);
