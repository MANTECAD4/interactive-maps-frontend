import axios from "axios";

export const geocodingApi = axios.create({
  baseURL: `https://api.mapbox.com/search/geocode/v6`,
  params: { access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN },
});
