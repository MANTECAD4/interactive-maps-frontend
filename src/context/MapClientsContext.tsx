import { createContext, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import type { ClientMarker, Coordinates } from "@/dtos";
import * as mapboxgl from "mapbox-gl/esm";

interface MapClientsState {
  mapRef: React.RefObject<mapboxgl.Map | null>;
  isMapLoaded: boolean;
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;

  clients: React.RefObject<Map<string, mapboxgl.Marker>>;
  hostMarker: ClientMarker | null;

  setHostMarker: React.Dispatch<React.SetStateAction<ClientMarker | null>>;
  handleAddHostMarker: (id: string, marker: mapboxgl.Marker) => void;
  handleAddClient: (
    client: ClientMarker,
    map: React.RefObject<mapboxgl.Map | null>,
  ) => void;
  handleDeleteClient: (id: string) => void;
  handleMoveClient: (id: string, coordinates: Coordinates) => void;
}

interface Props {
  children: ReactNode;
}

export const MapClientsContext = createContext<MapClientsState>(
  {} as MapClientsState,
);

export const MapClientsContextProvider: FC<Props> = ({ children }) => {
  const clients = useRef<Map<string, mapboxgl.Marker>>(new Map());

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [hostMarker, setHostMarker] = useState<ClientMarker | null>(null);

  const handleAddHostMarker = (id: string, marker: mapboxgl.Marker) => {
    clients.current.set(id, marker);
  };

  const handleAddClient = (
    client: ClientMarker,
    mapRef: React.RefObject<mapboxgl.Map | null>,
  ) => {
    if (!mapRef.current) {
      console.error({ error: "Map not initialized" });
      return;
    }
    const marker = new mapboxgl.Marker({ color: client.color })
      .setLngLat([client.coordinates.lon, client.coordinates.lat])
      .addTo(mapRef.current);

    clients.current.set(client.id, marker);
  };

  const handleDeleteClient = (id: string) => {
    clients.current.delete(id);
  };

  const handleMoveClient = (id: string, coordinates: Coordinates) => {
    const prevStatusMarker = clients.current.get(id);
    if (!prevStatusMarker) {
      console.error({ error: `Marker not found with id ${id}` });
      return;
    }
    prevStatusMarker.setLngLat([coordinates.lon, coordinates.lat]);
  };

  return (
    <MapClientsContext
      value={{
        clients,
        isMapLoaded,
        handleAddClient,
        handleDeleteClient,
        handleMoveClient,
        hostMarker,
        handleAddHostMarker,
        setHostMarker,
        setIsMapLoaded,
        mapRef,
      }}
    >
      {children}
    </MapClientsContext>
  );
};
