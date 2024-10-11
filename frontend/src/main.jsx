import { createRoot } from "react-dom/client";

import App from "./App";
import "./style.css";

if (import.meta.env.MODE === "production") {
  window.console.log = () => {};
  window.console.warn = () => {};
  window.console.error = () => {};
}

createRoot(document.getElementById("root")).render(<App />);
