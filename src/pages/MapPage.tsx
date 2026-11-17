import { MapboxMap } from "@/components/MapboxMap";
import { LocationInfo } from "@/components/LocationInfo";

export const MapPage = () => {
  return (
    <main>
      {/* <MapControls /> */}
      <LocationInfo />
      {/* <RegisterForm /> */}
      <MapboxMap />
    </main>
  );
};
