import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3ContextProvider } from "../helpers/web3";

import "../styles/globals.scss";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

export default function WoofyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ChakraProvider>
  );
}
