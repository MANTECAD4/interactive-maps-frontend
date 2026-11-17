import { MapClientsContext } from "@/context/MapClientsContext";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationReverse } from "@/actions/get-location-reverse.action";
export const useLocationInfo = () => {
  const { hostInfo } = use(MapClientsContext);

  const locationQuery = useQuery({
    queryFn: () =>
      getLocationReverse({
        latitude: hostInfo!.coordinates.lat,
        longitude: hostInfo!.coordinates.lon,
      }),
    queryKey: [
      "location",
      {
        latitude: Number(hostInfo!.coordinates.lat.toFixed(1)),
        longitude: Number(hostInfo!.coordinates.lon.toFixed(1)),
      },
    ],
    enabled: hostInfo !== null,
    select: (data) => data.features[0].properties,
  });
  console.log(locationQuery.data?.full_address);
  console.log({ error: locationQuery.error });
  return { hostInfo };
};
