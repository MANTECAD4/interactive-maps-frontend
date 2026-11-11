import { createContext, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import type { ClientMarker, Coordinates } from "@/dtos";
import * as mapboxgl from "mapbox-gl/esm";

interface MapClientsState {
  //! PROPERTIES
  hostMarker: ClientMarker | null;
  clients: React.RefObject<Map<string, mapboxgl.Marker>>;
  mapRef: React.RefObject<mapboxgl.Map | null>;
  isMapLoaded: boolean;

  //! Setters
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setHostMarker: React.Dispatch<React.SetStateAction<ClientMarker | null>>;

  //! Methods
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

  return (
    <MapClientsContext
      value={{
        //! Properties
        clients,
        hostMarker,
        mapRef,
        isMapLoaded,

        //! Setters
        setHostMarker,
        setIsMapLoaded,

        //! Methods
        handleAddClient,
        handleDeleteClient,
        handleMoveClient,
        handleAddHostMarker,
      }}
    >
      {children}
    </MapClientsContext>
  );
};
