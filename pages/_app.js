import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3ContextProvider } from "../helpers/web3";

import "../styles/globals.css"

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

function woofy({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ChakraProvider>
  );
}
export default woofy;
