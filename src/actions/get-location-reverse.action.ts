import { geocodingApi } from "@/api/geocoding.api";
import type { GeocodingAPIResponse } from "@/types/geocoding-api";

interface Props {
  latitude: number;
  longitude: number;
}

export const getLocationReverse = async ({ latitude, longitude }: Props) => {
  const { data } = await geocodingApi.get<GeocodingAPIResponse>("/reverse", {
    params: { latitude, longitude },
  });
  return data;
};
