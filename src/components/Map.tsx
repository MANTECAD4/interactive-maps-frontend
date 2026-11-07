import { useRef, useEffect, useState } from "react";
import * as mapboxgl from "mapbox-gl/esm";
import "mapbox-gl/dist/mapbox-gl.css";
import { SearchBox } from "@mapbox/search-js-react";

function Map() {
  const mapRef = useRef<mapboxgl.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapRef.current = new mapboxgl.Map({
      accessToken:
        "***REMOVED***",
      container: mapContainerRef.current,
      center: [-103.34583950146607, 20.677395378085805], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 13, // starting zoom
      style: "mapbox://styles/nanelmtzz/cmw44ercd01q001qp39cxdnt5",
      doubleClickZoom: false,
    });

    mapRef.current.on("load", () => {
      setMapLoaded(true);
    });

    new mapboxgl.Marker() // initialize a new marker
      .setLngLat([-103.34583950146607, 20.677395378085805]) // Marker [lng, lat] coordinates
      .addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <>
      {mapRef.current && (
        <div className="fixed top-3 left-3 w-80 z-10">
          <SearchBox
            accessToken={
              "***REMOVED***"
            }
            map={mapRef.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
              setInputValue(d);
            }}
            options={{
              proximity: [-103.34583950146607, 20.677395378085805],
              bbox: [
                [-103.88048, 20.42959],
                [-102.78258, 20.90861],
              ],
            }}
            marker
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
