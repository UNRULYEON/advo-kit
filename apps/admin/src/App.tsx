import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@/api";
import AppRouter from "@/AppRouter";

const App = () => {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          // mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    []
    // [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <AppRouter />
      </SWRConfig>
    </ThemeProvider>
  );
};

export default App;
