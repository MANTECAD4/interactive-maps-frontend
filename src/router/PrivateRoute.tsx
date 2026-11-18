import { MapClientsContext } from "@/context/MapClientsContext";
import { use, type FC, type ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  element: ReactNode;
}
export const PrivateRoute: FC<Props> = ({ element }) => {
  const { hostInfo } = use(MapClientsContext);

  if (hostInfo === null) {
    return <Navigate to="/register" />;
  }
  return <>{element}</>;
};
