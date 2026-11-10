import {
  WebSocketContext,
  WebSocketStatus,
} from "@/websockets/WebSocketProvider";
import { use, type FC, type ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  element: ReactNode;
}
export const PrivateRoute: FC<Props> = ({ element }) => {
  const { status } = use(WebSocketContext);

  if (status !== WebSocketStatus.Connected) {
    return <Navigate to="/register" />;
  }
  return <>{element}</>;
};
