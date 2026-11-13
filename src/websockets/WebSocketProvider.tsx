import type { ClientMarker } from "@/dtos";
import {
  RequestMessage,
  type WebSocketRequestMessage,
} from "@/dtos/requests.dtos";
import {
  ResponseMessageType,
  WebSocketResponseSchema,
} from "@/dtos/responses.dtos";
import {
  createContext,
  useCallback,
  useState,
  type FC,
  type ReactNode,
} from "react";
import z from "zod";

export enum WebSocketStatus {
  "Connecting" = "Connecting",
  "Connected" = "Connected",
  "Disconnected" = "Disconnected",
  "Error" = "Error",
}

interface WebSocketContextState {
  status: WebSocketStatus;
  sendMessage: (payload: WebSocketRequestMessage) => void;
  connect: (hostInfo: ClientMarker) => void;
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

  const responseHandler = (response: any) => {
    const { data: responseParsed, error } =
      WebSocketResponseSchema.safeParse(response);
    if (error) {
      throw new Error(`Invalid response: ${z.prettifyError(error)}`);
    }
    switch (responseParsed.type) {
      case ResponseMessageType.CLIENT_MARKERS_LIST:
        console.log({ markers: responseParsed.payload });
        break;
      default:
        throw new Error(`Response type:${responseParsed.type} not identified`);
    }
  };

  const connect = useCallback(
    (hostInfo: ClientMarker) => {
      const ws = new WebSocket(url);
      ws.addEventListener("open", () => {
        setSocket(ws);
        setStatus(WebSocketStatus.Connected);
        ws.send(
          JSON.stringify({
            type: RequestMessage.REGISTER_CLIENT,
            payload: hostInfo,
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
          responseHandler(response);
        } catch (error) {
          const message = (error as any).message ?? error;
          console.log({ error: message });
        }
      });

      return ws;
    },
    [url],
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

  return (
    <WebSocketContext value={{ status, sendMessage, connect }}>
      {children}
    </WebSocketContext>
  );
};

// useEffect(() => {
//   return () => {
//     if (socket?.readyState === WebSocket.OPEN) {
//       setSocket(null);
//       socket.close();
//     }
//   };
// }, []);

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
