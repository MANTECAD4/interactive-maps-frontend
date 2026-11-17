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
// ! RESPONSE EXAMPLE
// {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "type": "Feature",
//             "id": "dXJuOm1ieGFkcjo4YzIxNDFmMy1hMWM3LTRhYWUtODJkMC1jZmUxZmU3YTVlMGM",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -103.345927,
//                     20.677388
//                 ]
//             },
//             "properties": {
//                 "mapbox_id": "dXJuOm1ieGFkcjo4YzIxNDFmMy1hMWM3LTRhYWUtODJkMC1jZmUxZmU3YTVlMGM",
//                 "feature_type": "address",
//                 "full_address": "Avenida Hidalgo 230, Centro, 44100 Guadalajara, Jalisco, Mexico",
//                 "name": "Avenida Hidalgo 230",
//                 "name_preferred": "Avenida Hidalgo 230",
//                 "coordinates": {
//                     "longitude": -103.345927,
//                     "latitude": 20.677388,
//                     "accuracy": "point",
//                     "routable_points": [
//                         {
//                             "name": "default",
//                             "latitude": 20.677383,
//                             "longitude": -103.345927
//                         }
//                     ]
//                 },
//                 "place_formatted": "Centro, 44100 Guadalajara, Jalisco, Mexico",
//                 "context": {
//                     "address": {
//                         "mapbox_id": "dXJuOm1ieGFkcjo4YzIxNDFmMy1hMWM3LTRhYWUtODJkMC1jZmUxZmU3YTVlMGM",
//                         "address_number": "230",
//                         "street_name": "Avenida Hidalgo",
//                         "name": "Avenida Hidalgo 230"
//                     },
//                     "street": {
//                         "mapbox_id": "dXJuOm1ieGFkci1zdHI6OGMyMTQxZjMtYTFjNy00YWFlLTgyZDAtY2ZlMWZlN2E1ZTBj",
//                         "name": "Avenida Hidalgo"
//                     },
//                     "neighborhood": {
//                         "mapbox_id": "dXJuOm1ieHBsYzpCS0dNbnc",
//                         "name": "Centro"
//                     },
//                     "postcode": {
//                         "mapbox_id": "dXJuOm1ieHBsYzpCTHhPbnc",
//                         "name": "44100"
//                     },
//                     "place": {
//                         "mapbox_id": "dXJuOm1ieHBsYzpyQ2lm",
//                         "name": "Guadalajara",
//                         "wikidata_id": "Q9022"
//                     },
//                     "region": {
//                         "mapbox_id": "dXJuOm1ieHBsYzpKSjg",
//                         "name": "Jalisco",
//                         "wikidata_id": "Q13160",
//                         "region_code": "JAL",
//                         "region_code_full": "MX-JAL"
//                     },
//                     "country": {
//                         "mapbox_id": "dXJuOm1ieHBsYzpJcDg",
//                         "name": "Mexico",
//                         "wikidata_id": "Q96",
//                         "country_code": "MX",
//                         "country_code_alpha_3": "MEX"
//                     }
//                 }
//             }
//         }
//     ],
//     "attribution": "NOTICE: © 2026 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained."
// }
