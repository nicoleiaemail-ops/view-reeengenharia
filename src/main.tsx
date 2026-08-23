import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { registerWebMcpTools } from "./lib/webmcp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Ferramentas WebMCP para agentes que navegam pelo navegador (no-op se a API não existir).
registerWebMcpTools();
