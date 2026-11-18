import { use, useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl/esm";
import { MapClientsContext } from "@/context/MapClientsContext";

export const useMap = () => {
  const { mapRef, setIsMapLoaded, connect } = use(MapClientsContext);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current !== null) return;
    mapRef.current = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current,
      // center: [lon, lat],
      center: [-103.34583950146607, 20.677395378085805],
      // style: "mapbox://styles/nanelmtzz/cmw44ercd01q001qp39cxdnt5",
    });
    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
      connect();
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl(), {
      position: "bottom-right",
    });

    return () => {
      // if (mapRef.current) {
      //   mapRef.current.remove();
      // }
    };
  }, [mapRef, setIsMapLoaded, connect]);

  return {
    mapContainerRef,
    mapRef,
  };
};
