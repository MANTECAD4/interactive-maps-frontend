import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import { MapClientsContextProvider } from "@/context/MapClientsContextProvider";
import { TanstackProvider } from "@/tanstack/TanstackProvider";

function App() {
  return (
    <TanstackProvider>
      <MapClientsContextProvider websocketUrl={import.meta.env.VITE_SERVER_URL}>
        <RouterProvider router={router} />
      </MapClientsContextProvider>
    </TanstackProvider>
  );
}

export default App;
