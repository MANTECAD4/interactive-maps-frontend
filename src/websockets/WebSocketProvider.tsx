import { MapClientsContext } from "@/context/MapClientsContext";
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
  use,
  useCallback,
  useRef,
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
  const socket = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.Disconnected,
  );

  const {
    setInitialClients,
    handleAddClient,
    handleDeleteClient,
    handleMoveClient,
  } = use(MapClientsContext);

  const responseHandler = (response: any) => {
    const { data: responseParsed, error } =
      WebSocketResponseSchema.safeParse(response);
    if (error) {
      throw new Error(`Invalid response: ${z.prettifyError(error)}`);
    }
    switch (responseParsed.type) {
      case ResponseMessageType.CLIENT_MARKERS_LIST: {
        setInitialClients(responseParsed.payload.clientMarkers);
        break;
      }
      case ResponseMessageType.CLIENT_JOINED: {
        handleAddClient(responseParsed.payload.clientMarker);
        break;
      }
      case ResponseMessageType.CLIENT_LEFT: {
        handleDeleteClient(responseParsed.payload.id);
        break;
      }
      case ResponseMessageType.CLIENT_MOVED: {
        handleMoveClient(
          responseParsed.payload.id,
          responseParsed.payload.coordinates,
        );
        break;
      }
      default:
        throw new Error(`Response type:${responseParsed.type} not identified`);
    }
  };

  const connect = useCallback(
    (hostInfo: ClientMarker) => {
      const ws = new WebSocket(url);
      ws.addEventListener("open", () => {
        socket.current = ws;
        setStatus(WebSocketStatus.Connected);
        ws.send(
          JSON.stringify({
            type: RequestMessage.REGISTER_CLIENT,
            payload: hostInfo,
          } satisfies WebSocketRequestMessage),
        );
      });

      ws.addEventListener("close", () => {
        socket.current?.close();
        socket.current = null;
        setStatus(WebSocketStatus.Disconnected);
      });

      ws.addEventListener("message", ({ data: rawMessage }) => {
        try {
          const response = JSON.parse(rawMessage);
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
    if (!socket.current) {
      return console.error({ error: "Socket not initialized" });
    }

    if (status !== WebSocketStatus.Connected) {
      return console.error({ error: "Socket not connected" });
    }
    socket.current.send(JSON.stringify(request));
  };

  return (
    <WebSocketContext value={{ status, sendMessage, connect }}>
      {children}
    </WebSocketContext>
  );
};
