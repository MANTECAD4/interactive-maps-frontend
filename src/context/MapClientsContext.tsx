import { createContext, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import type { ClientMarker, Coordinates } from "@/dtos";
import * as mapboxgl from "mapbox-gl/esm";

interface MapClientsState {
  //! PROPERTIES
  hostInfo: ClientMarker | null;
  clients: React.RefObject<Map<string, mapboxgl.Marker>>;
  mapRef: React.RefObject<mapboxgl.Map | null>;
  isMapLoaded: boolean;

  //! Setters
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setHostInfo: React.Dispatch<React.SetStateAction<ClientMarker | null>>;

  //! Methods
  setInitialClients: (clientMarkers: ClientMarker[]) => void;
  addHostMarker: (hostInfo: ClientMarker) => void;
  handleAddClient: (
    client: ClientMarker,
    map: React.RefObject<mapboxgl.Map | null>,
  ) => void;
  getHostMarker: () => undefined | mapboxgl.Marker;
  handleDeleteClient: (id: string) => void;
  handleMoveClient: (id: string, coordinates: Coordinates) => void;
  clearState: () => void;
  linkClientMarkersToMap: () => void;
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

  const [hostInfo, setHostInfo] = useState<ClientMarker | null>(null);

  const setInitialClients = (clientMarkers: ClientMarker[]) => {
    for (const client of clientMarkers) {
      const popup = new mapboxgl.Popup().setHTML(`<p>${client.name}</p>`);
      const marker = new mapboxgl.Marker({ color: client.color })
        .setLngLat([client.coordinates.lon, client.coordinates.lat])
        .setPopup(popup);
      clients.current.set(client.id, marker);
    }
  };

  const addHostMarker = (hostInfo: ClientMarker) => {
    setHostInfo(hostInfo);
    const popup = new mapboxgl.Popup().setHTML(`<p>${hostInfo.name}</p>`);
    const marker = new mapboxgl.Marker({
      color: hostInfo.color,
      draggable: true,
    })
      .setLngLat([hostInfo.coordinates.lon, hostInfo.coordinates.lat])
      .setPopup(popup);
    clients.current.set(hostInfo.id, marker);
  };

  const getHostMarker = (): mapboxgl.Marker | undefined => {
    if (hostInfo === null) {
      console.error({ error: "Host info not available in getHostMarker" });
      return;
    }
    return clients.current.get(hostInfo.id);
  };

  const linkClientMarkersToMap = () => {
    if (mapRef.current === null) {
      console.log({ error: "Map not initialized for clients loading" });
      return;
    }
    clients.current.forEach((clientMarker) => {
      clientMarker.addTo(mapRef.current!);
    });
  };

  const clearState = () => {
    setIsMapLoaded(false);
    setHostInfo(null);
    clients.current.clear();
  };

  const handleAddClient = (
    client: ClientMarker,
    mapRef: React.RefObject<mapboxgl.Map | null>,
  ) => {
    if (!mapRef.current) {
      console.error({ error: "Map not initialized" });
      return;
    }
    const popup = new mapboxgl.Popup().setHTML(`<p>${client.name}</p>`);
    const marker = new mapboxgl.Marker({ color: client.color })
      .setLngLat([client.coordinates.lon, client.coordinates.lat])
      .addTo(mapRef.current)
      .setPopup(popup);

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
        hostInfo,
        mapRef,
        isMapLoaded,

        //! Setters
        setIsMapLoaded,
        setHostInfo,

        //! Methods
        getHostMarker,
        clearState,
        setInitialClients,
        handleAddClient,
        handleDeleteClient,
        handleMoveClient,
        addHostMarker,
        linkClientMarkersToMap,
      }}
    >
      {children}
    </MapClientsContext>
  );
};
