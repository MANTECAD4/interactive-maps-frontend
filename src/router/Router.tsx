import { MapPage } from "@/pages/MapPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { PrivateRoute } from "@/router/PrivateRoute";
import { PublicRoute } from "@/router/PublicRoute";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <PublicRoute element={<RegisterPage />} />,
  },
  {
    path: "/map",
    element: <PrivateRoute element={<MapPage />} />,
  },
  {
    path: "*",
    element: <Navigate to={"/register"} />,
  },
]);
