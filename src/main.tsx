import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { ReceiptsProvider } from "./contexts/ReceiptsContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <ReceiptsProvider>
          <RouterProvider router={router} />
        </ReceiptsProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
