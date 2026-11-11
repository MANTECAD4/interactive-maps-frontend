import {
  RequestMessage,
  type RegisterClientDto,
  type WebSocketRequestMessage,
} from "@/dtos/requests.dtos";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";

export enum WebSocketStatus {
  "Connecting" = "Connecting",
  "Connected" = "Connected",
  "Disconnected" = "Disconnected",
  "Error" = "Error",
}

interface WebSocketContextState {
  status: WebSocketStatus;
  sendMessage: (payload: WebSocketRequestMessage) => void;
  connect: (userData: RegisterClientDto) => void;
}

interface Props {
  url: string;
  children: ReactNode;
}

export const WebSocketContext = createContext<WebSocketContextState>(
  {} as WebSocketContextState,
);

export const WebSocketProvider: FC<Props> = ({ children, url }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.Disconnected,
  );

  const sendMessage = (request: WebSocketRequestMessage) => {
    if (!socket) {
      return console.error({ error: "Socket not initialized" });
    }

    if (status !== WebSocketStatus.Connected) {
      return console.error({ error: "Socket not connected" });
    }
    socket?.send(JSON.stringify(request));
  };

  const connect = useCallback(
    (userData: RegisterClientDto) => {
      const ws = new WebSocket(url);
      ws.addEventListener("open", () => {
        setSocket(ws);
        setStatus(WebSocketStatus.Connected);
        ws.send(
          JSON.stringify({
            type: RequestMessage.REGISTER_CLIENT,
            payload: userData,
          } satisfies WebSocketRequestMessage),
        );
      });

      ws.addEventListener("close", () => {
        setSocket(null);
        setStatus(WebSocketStatus.Disconnected);
      });

      ws.addEventListener("message", ({ data: rawMessage }) => {
        try {
          const response = JSON.parse(rawMessage);
          console.log({ response });
        } catch (error) {
          console.log({ error });
        }
      });

      return ws;
    },
    [url],
  );

  useEffect(() => {
    return () => {
      if (socket?.readyState === WebSocket.OPEN) {
        setSocket(null);
        socket.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (status !== WebSocketStatus.Disconnected) return;

  //   let attempts = 0;

  //   const interval = setInterval(() => {
  //     console.log("Reconnecting...");
  //     connect();
  //     attempts++;
  //     if (attempts >= 10) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // }, [status, connect]);

  return (
    <WebSocketContext value={{ status, sendMessage, connect }}>
      {children}
    </WebSocketContext>
  );
};
