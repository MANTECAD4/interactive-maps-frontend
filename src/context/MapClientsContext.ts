import type { ClientMarker, Coordinates } from "@/dtos";
import type { WebSocketRequestMessage } from "@/dtos/requests.dtos";
import * as mapboxgl from "mapbox-gl/esm";

import { createContext } from "react";

export interface MapClientsState {
  //! PROPERTIES
  hostInfo: ClientMarker | null;
  clients: React.RefObject<Map<string, mapboxgl.Marker>>;
  mapRef: React.RefObject<mapboxgl.Map | null>;
  isMapLoaded: boolean;

  //! Setters
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setHostInfo: React.Dispatch<React.SetStateAction<ClientMarker | null>>;

  //! Methods
  // Map & clients state
  setInitialClients: (clientMarkers: ClientMarker[]) => void;
  handleAddClient: (client: ClientMarker) => void;
  handleDeleteClient: (id: string) => void;
  handleMoveClient: (id: string, coordinates: Coordinates) => void;

  // Websocket handling
  sendMessage: (payload: WebSocketRequestMessage) => void;
  connect: () => void;

  clearState: () => void;
}

export const MapClientsContext = createContext<MapClientsState>(
  {} as MapClientsState,
);
