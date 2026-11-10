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
  sendMessage: (payload: unknown) => void;
}

interface Props {
  url: string;
  children: ReactNode;
}

export const WebSocketContext = createContext<WebSocketContextState>(
  {} as WebSocketContextState,
);

export const WebSocketProvider: FC<Props> = ({ children, url }) => {
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.Disconnected,
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    ws.addEventListener("open", () => {
      setSocket(ws);
      setStatus(WebSocketStatus.Connected);
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
  }, [url]);

  useEffect(() => {
    const ws = connect();

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        setSocket(null);
        ws.close();
      }
    };
  }, [connect]);

  useEffect(() => {
    if (status !== WebSocketStatus.Disconnected) return;

    let attempts = 0;

    const interval = setInterval(() => {
      console.log("Reconnecting...");
      connect();
      attempts++;
      if (attempts >= 10) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status, connect]);
  const sendMessage = (request: unknown) => {
    if (!socket) {
      console.error({ error: "Socket not initialized" });
    }

    if (status !== WebSocketStatus.Connected) {
      console.error({ error: "Socket not connected" });
    }
    socket?.send(JSON.stringify(request));
  };
  return (
    <WebSocketContext value={{ status, sendMessage }}>
      {children}
    </WebSocketContext>
  );
};
