import { useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import * as mapboxgl from "mapbox-gl/esm";
import type { ClientMarker, Coordinates } from "@/dtos/";
import { MapClientsContext } from "@/context/MapClientsContext";
import {
  RequestMessage,
  type WebSocketRequestMessage,
} from "@/dtos/requests.dtos";
import {
  ResponseMessageType,
  WebSocketResponseSchema,
} from "@/dtos/responses.dtos";
import z from "zod";

interface Props {
  websocketUrl: string;
  children: ReactNode;
}

export const MapClientsContextProvider: FC<Props> = ({
  children,
  websocketUrl,
}) => {
  const clients = useRef<Map<string, mapboxgl.Marker>>(new Map());

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [hostInfo, setHostInfo] = useState<ClientMarker | null>(null);

  const socket = useRef<WebSocket | null>(null);

  const sendMessage = (request: WebSocketRequestMessage) => {
    if (!socket.current) {
      return console.error({ error: "Socket not initialized" });
    }

    if (socket.current.readyState !== WebSocket.OPEN) {
      return console.error({ error: "Socket not connected" });
    }

    socket.current.send(JSON.stringify(request));
  };

  const createMarker = (
    client: ClientMarker,
    isHost: boolean = false,
  ): mapboxgl.Marker => {
    if (!mapRef.current) {
      throw new Error("Map not initialized. marker creation failed");
    }

    if (isHost) {
      const popup = new mapboxgl.Popup().setHTML(`<p>${client.name}</p>`);
      const marker = new mapboxgl.Marker({
        color: client.color,
        draggable: true,
      })
        .setLngLat([client.coordinates.lon, client.coordinates.lat])
        .setPopup(popup)
        .addTo(mapRef.current);
      marker.on("drag", () => {
        const { lat, lng: lon } = marker.getLngLat();
        sendMessage({
          type: RequestMessage.MOVE_CLIENT,
          payload: {
            coordinates: {
              lat,
              lon,
            },
            updatedAt: new Date(),
          },
        });
      });

      marker.on("dragend", ({ target }) => {
        const { lng: lon, lat } = target.getLngLat();
        setHostInfo((prev) =>
          prev ? { ...prev, coordinates: { lat, lon } } : null,
        );
      });
      return marker;
    }

    const popup = new mapboxgl.Popup().setHTML(`<p>${client.name}</p>`);
    const marker = new mapboxgl.Marker({
      color: client.color,
    })
      .setLngLat([client.coordinates.lon, client.coordinates.lat])
      .setPopup(popup)
      .addTo(mapRef.current);
    return marker;
  };

  const setInitialClients = (clientMarkers: ClientMarker[]) => {
    for (const client of clientMarkers) {
      let marker: mapboxgl.Marker;
      if (client.id === hostInfo!.id) {
        marker = createMarker(client, true);
      } else {
        marker = createMarker(client);
      }
      clients.current.set(client.id, marker);
    }
  };

  const handleAddClient = (client: ClientMarker) => {
    if (!mapRef.current) {
      console.error({ error: "Map not initialized" });
      return;
    }
    const marker = createMarker(client);
    marker.addTo(mapRef.current);

    clients.current.set(client.id, marker);
  };

  const handleDeleteClient = (id: string) => {
    const marker = clients.current.get(id);
    if (!marker) {
      console.log({ error: `Marker with id ${id} not found for deletion` });
      return;
    }
    clients.current.delete(id);
    marker.remove();
  };

  const handleMoveClient = (id: string, coordinates: Coordinates) => {
    const prevStatusMarker = clients.current.get(id);
    if (!prevStatusMarker) {
      console.error({ error: `Marker not found with id ${id}` });
      return;
    }
    prevStatusMarker.setLngLat([coordinates.lon, coordinates.lat]);
  };

  const responseHandler = (response: unknown) => {
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

  const connect = () => {
    if (!hostInfo) {
      throw new Error("Missing host info - websocket connect failed");
    }
    const ws = new WebSocket(websocketUrl);
    ws.addEventListener("open", () => {
      socket.current = ws;
      ws.send(
        JSON.stringify({
          type: RequestMessage.REGISTER_CLIENT,
          payload: hostInfo,
        } satisfies WebSocketRequestMessage),
      );
    });

    ws.addEventListener("close", () => {
      socket.current = null;
    });

    ws.addEventListener("message", ({ data: rawMessage }) => {
      try {
        const response = JSON.parse(rawMessage);
        responseHandler(response);
      } catch (error) {
        console.log(error);
        const message = (error as Error).message ?? error;
        console.log({ error: message });
      }
    });

    return ws;
  };

  const clearState = () => {
    setIsMapLoaded(false);
    setHostInfo(null);
    clients.current.forEach((clientMarker) => clientMarker.remove());
    clients.current.clear();
  };

  return (
    <MapClientsContext
      value={{
        //! Properties
        clients,
        hostInfo,
        mapRef,
        isMapLoaded,

        //! Setters
        setIsMapLoaded,
        setHostInfo,

        //! Methods
        setInitialClients,
        handleAddClient,
        handleDeleteClient,
        handleMoveClient,
        connect,
        sendMessage,
        clearState,
      }}
    >
      {children}
    </MapClientsContext>
  );
};
