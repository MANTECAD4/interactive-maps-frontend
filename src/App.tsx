import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import { MapClientsContextProvider } from "@/context/MapClientsContextProvider";
import { TanstackProvider } from "@/tanstack/TanstackProvider";
import { Toaster } from "@/components/ui/toast";

function App() {
  return (
    <TanstackProvider>
      <MapClientsContextProvider websocketUrl={import.meta.env.VITE_SERVER_URL}>
        <RouterProvider router={router} />
        <Toaster />
      </MapClientsContextProvider>
    </TanstackProvider>
  );
}

export default App;
