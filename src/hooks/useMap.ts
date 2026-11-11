import { use, useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl/esm";
import { MapClientsContext } from "@/context/MapClientsContext";

export const useMap = () => {
  const { mapRef, setIsMapLoaded, isMapLoaded, hostMarker } =
    use(MapClientsContext);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapRef.current = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current,
      center: [-103.34583950146607, 20.677395378085805], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 13, // starting zoom
      // style: "mapbox://styles/nanelmtzz/cmw44ercd01q001qp39cxdnt5",
    });
    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl(), {
      position: "bottom-right",
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // If host marker & map are set, adds a new marker for host
  useEffect(() => {
    if (!isMapLoaded || !hostMarker || !mapRef.current) return;

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([hostMarker.coordinates.lon, hostMarker.coordinates.lat])
      .addTo(mapRef.current);

    marker.on("drag", () => {
      console.log({ coords: marker.getLngLat() });
    });
  }, [hostMarker, isMapLoaded, mapRef]);

  return {
    mapContainerRef,
    mapRef,
  };
};
