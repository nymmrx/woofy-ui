import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3ContextProvider } from "../helpers/web3";

import "../styles/globals.css";

import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";

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
