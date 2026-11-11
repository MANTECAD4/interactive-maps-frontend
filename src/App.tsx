import { WebSocketProvider } from "@/websockets/WebSocketProvider";
import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import { MapClientsContextProvider } from "@/context/MapClientsContext";

function App() {
  return (
    <MapClientsContextProvider>
      <WebSocketProvider url={import.meta.env.VITE_SERVER_URL}>
        <RouterProvider router={router} />
      </WebSocketProvider>
    </MapClientsContextProvider>
  );
}

export default App;
