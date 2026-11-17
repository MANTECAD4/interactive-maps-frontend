import { WebSocketProvider } from "@/websockets/WebSocketProvider";
import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import { MapClientsContextProvider } from "@/context/MapClientsContext";
import { TanstackProvider } from "@/tanstack/TanstackProvider";

function App() {
  return (
    <TanstackProvider>
      <MapClientsContextProvider>
        <WebSocketProvider url={import.meta.env.VITE_SERVER_URL}>
          <RouterProvider router={router} />
        </WebSocketProvider>
      </MapClientsContextProvider>
    </TanstackProvider>
  );
}

export default App;
