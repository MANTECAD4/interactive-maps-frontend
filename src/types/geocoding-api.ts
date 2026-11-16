export interface GeocodingAPIResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  place_formatted: string;
  context: Context;
}

interface Context {
  address: Address;
  street: Neighborhood;
  neighborhood: Neighborhood;
  postcode: Neighborhood;
  place: Place;
  region: Region;
  country: Country;
}

interface Address {
  mapbox_id: string;
  address_number: string;
  street_name: string;
  name: string;
}

interface Country {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  country_code: string;
  country_code_alpha_3: string;
}

interface Neighborhood {
  mapbox_id: string;
  name: string;
}

interface Place {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
}

interface Region {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  region_code: string;
  region_code_full: string;
}

interface Coordinates {
  longitude: number;
  latitude: number;
  accuracy: string;
  routable_points: RoutablePoint[];
}

interface RoutablePoint {
  name: string;
  latitude: number;
  longitude: number;
}
