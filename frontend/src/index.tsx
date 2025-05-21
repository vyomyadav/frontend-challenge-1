import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@mantine/core/styles.css";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-enterprise';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById("root")).render(<App />);
