import React, { useContext } from "react";
import dynamic from "next/dynamic";

export const Web3Context = React.createContext({});

export function useWeb3() {
  return useContext(Web3Context);
}

export const Web3ContextProvider = dynamic(() => import("./onboard"), {
  ssr: false,
});
