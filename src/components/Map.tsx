import * as mapboxgl from "mapbox-gl/esm";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchBox } from "@mapbox/search-js-react";
import { useMap } from "@/hooks/useMap";
function Map() {
  const { mapContainerRef, mapRef } = useMap();

  return (
    <>
      {mapRef.current && (
        <div className="fixed top-2.5 left-2.5 w-80 z-10">
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            map={mapRef.current}
            //@ts-ignore
            mapboxgl={mapboxgl}
            options={{
              proximity: [-103.34583950146607, 20.677395378085805],
              // bbox: [
              //   [-103.88048, 20.42959],
              //   [-102.78258, 20.90861],
              // ],
            }}
            // marker
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
}

export default Map;
