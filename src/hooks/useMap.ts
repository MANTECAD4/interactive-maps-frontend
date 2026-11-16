import { use, useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl/esm";
import { MapClientsContext } from "@/context/MapClientsContext";
import { WebSocketContext } from "@/websockets/WebSocketProvider";
import { RequestMessage } from "@/dtos/requests.dtos";

export const useMap = () => {
  const { mapRef, setIsMapLoaded } = use(MapClientsContext);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { sendMessage } = use(WebSocketContext);
  const {
    getHostMarker,
    setHostInfo,
    linkClientMarkersToMap,
    getHostCoordinates,
  } = use(MapClientsContext);

  // Initialize map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const { lat, lon } = getHostCoordinates()!;
    mapRef.current = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current,
      center: [lon, lat],
      // center: [-103.34583950146607, 20.677395378085805],
      // style: "mapbox://styles/nanelmtzz/cmw44ercd01q001qp39cxdnt5",
    });
    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
      const hostMarker = getHostMarker();
      if (!hostMarker) {
        console.log({ error: "host marker not found on map on load" });
        return;
      }
      hostMarker.on("drag", () => {
        const { lat, lng: lon } = hostMarker.getLngLat();
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

      hostMarker.on("dragend", () => {
        const { lng: lon, lat } = hostMarker.getLngLat();
        setHostInfo((prev) =>
          prev ? { ...prev, coordinates: { lat, lon } } : null,
        );
      });
      linkClientMarkersToMap();
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

  // useEffect(() => {
  //   if (!isMapLoaded || !hostMarker || !mapRef.current) return;

  //   const popup = new mapboxgl.Popup().setHTML(`<p>${hostMarker.name}</p>`);

  //   const marker = new mapboxgl.Marker({
  //     draggable: true,
  //     color: hostMarker.color,
  //   })
  //     .setLngLat([hostMarker.coordinates.lon, hostMarker.coordinates.lat])
  //     .addTo(mapRef.current)
  //     .setPopup(popup);

  //   marker.on("drag", () => {
  //     const { lat, lng: lon } = marker.getLngLat();
  //     console.log({ lat, lon });
  //     sendMessage({
  //       type: RequestMessage.MOVE_CLIENT,
  //       payload: {
  //         coordinates: {
  //           lat,
  //           lon,
  //         },
  //       },
  //     });
  //   });

  //   marker.on("dragend", () => {
  //     const { lng: lon, lat } = marker.getLngLat();
  //     setHostInfo((prev) =>
  //       prev ? { ...prev, coordinates: { lat, lon } } : null,
  //     );
  //   });
  // }, [hostMarker, isMapLoaded]);

  return {
    mapContainerRef,
    mapRef,
  };
};
