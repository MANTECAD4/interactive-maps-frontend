import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationReverse } from "@/actions/get-location-reverse.action";
import { MapClientsContext } from "@/context/MapClientsContext";
import type { Coordinates } from "@/dtos";
export const useLocationInfo = () => {
  const { hostInfo } = use(MapClientsContext);

  const [isCoppiedToClipboard, setIsCoppiedToClipboard] = useState(false);
  const locationQuery = useQuery({
    queryFn: () =>
      getLocationReverse({
        latitude: hostInfo!.coordinates.lat,
        longitude: hostInfo!.coordinates.lon,
      }),
    queryKey: [
      "location",
      {
        latitude: Number(hostInfo!.coordinates.lat.toFixed(3)),
        longitude: Number(hostInfo!.coordinates.lon.toFixed(3)),
      },
    ],
    enabled: hostInfo !== null,
    select: (data) => data.features[0].properties,
  });

  const handleCopyCoordinates = (coordinates: Coordinates) => {
    const newClip = `Longitude: ${coordinates.lon}, Latitude:${coordinates.lat}`;
    navigator.clipboard.writeText(newClip).then(
      async () => {
        setIsCoppiedToClipboard(true);

        await new Promise(() =>
          setTimeout(() => {
            setIsCoppiedToClipboard(false);
          }, 2000),
        );
      },
      () => {
        console.error("Copying to clipboard failed");
      },
    );
  };

  return {
    hostInfo,
    locationQuery,
    handleCopyCoordinates,
    isCoppiedToClipboard,
  };
};
