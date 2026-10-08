import { createBrowserRouter } from "react-router-dom";
import Layout from "@app/Layout";
import DashboardLayout from "@app/DashboardLayout";
import { AuthPage, AuthVerifyPage } from "@pages/AuthPage";
import { HomePage } from "@pages/HomePage";
import { AnalyticsPage } from "@pages/AnalyticsPage";
import { OrdersPage } from "@pages/OrdersPage";
import { MenuPage } from "@pages/MenuPage";
import { ProfilePage } from "@pages/ProfilePage";
import { SettingsPage } from "@pages/SettingsPage";
import { ROUTES } from "@shared/config/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ROUTES.analytics, element: <AnalyticsPage /> },
          { path: ROUTES.orders, element: <OrdersPage /> },
          { path: ROUTES.menu, element: <MenuPage /> },
          { path: ROUTES.profile, element: <ProfilePage /> },
          { path: ROUTES.settings, element: <SettingsPage /> },
        ],
      },
      { path: ROUTES.auth, element: <AuthPage /> },
      { path: ROUTES.authVerify, element: <AuthVerifyPage /> },
      { path: "*", element: <div>ооо</div> },
    ],
  },
]);
