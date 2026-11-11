import { MapboxMap } from "@/components/MapboxMap";
import { MarkerInfo } from "@/components/MarkerInfo";

export const MapPage = () => {
  return (
    <main>
      {/* <MapControls /> */}
      <MarkerInfo />
      {/* <RegisterForm /> */}
      <MapboxMap />
    </main>
  );
};
