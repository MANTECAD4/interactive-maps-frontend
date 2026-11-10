import { useEffect, useRef, useState } from "react";
import * as mapboxgl from "mapbox-gl/esm";

export const useMap = () => {
  const mapRef = useRef<mapboxgl.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [_isLoaded, setIsLoaded] = useState(false);
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
      // console.log("Map ready!");
      setIsLoaded(true);
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

  return {
    mapContainerRef,
    mapRef,
  };
};
