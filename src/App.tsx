import { WebSocketProvider } from "@/websockets/WebSocketProvider";
import { RouterProvider } from "react-router";
import { router } from "@/router/Router";

function App() {
  return (
    <WebSocketProvider url={import.meta.env.VITE_SERVER_URL}>
      <RouterProvider router={router} />
    </WebSocketProvider>
  );
}

export default App;
