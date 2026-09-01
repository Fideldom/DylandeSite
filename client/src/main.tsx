/**
 * DYLANDE — Navy Precision / Corporate Rebuild
 * Entry point do frontend React.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
