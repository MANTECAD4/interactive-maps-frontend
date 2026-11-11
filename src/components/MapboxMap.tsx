import * as mapboxgl from "mapbox-gl/esm";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchBox } from "@mapbox/search-js-react";
import { useMap } from "@/hooks/useMap";
export const MapboxMap = () => {
  const { mapContainerRef, mapRef } = useMap();
  return (
    <>
      {mapRef.current && (
        <div className="fixed top-2.5 left-2.5 w-80 z-10">
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            map={mapRef.current}
            // @ts-ignore
            mapboxgl={mapboxgl}
            options={{
              proximity: [-103.34583950146607, 20.677395378085805],
            }}
          />
        </div>
      )}
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-full min-h-dvh"
      />
    </>
  );
};

export default MapboxMap;
{
  /* <button
        onClick={() => {
          handleAddClient(
            {
              id: crypto.randomUUID(),
              name: "nanel",
              coordinates: {
                lon: -103.34583950146607,
                lat: 20.677395378085805,
              },
              color: "red",
              updatedAt: new Date(),
            },
            mapRef,
          );
        }}
      >
        add client
      </button> */
}
