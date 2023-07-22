import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import theme from "@/theme";
import { fetcher } from "@/api";
import InitComponent from "@/components/InitComponent/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher: fetcher }}>
        <InitComponent>
          <App />
        </InitComponent>
      </SWRConfig>
    </ThemeProvider>
  </React.StrictMode>
);
