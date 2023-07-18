import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";
import theme from "@/theme";
import { fetcher } from "@/api";
import InitComponent from "@/components/InitComponent";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher: fetcher }}>
        <InitComponent>Hello world!</InitComponent>
      </SWRConfig>
    </ThemeProvider>
  );
};

export default App;
