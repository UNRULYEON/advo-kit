import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    white: string;
    black: string;
  }
}
