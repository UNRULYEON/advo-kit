import { ThemeProvider } from "styled-components";
import theme from "@/theme";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <ThemeProvider theme={theme}>hello world</ThemeProvider>;
};

export default App;
