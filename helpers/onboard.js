import React, { useCallback, useMemo, useState } from "react";
import Onboard from "bnc-onboard";

import { Web3Provider } from "@ethersproject/providers";

import { Web3Context } from "./web3";

const NetworkId = 1;
const rpcUrl = process.env.WEB3_PROVIDER_HTTPS;

const wallets = [
  { walletName: "metamask" },
  {
    walletName: "walletConnect",
    rpc: {
      1: rpcUrl,
    },
  },
  {
    walletName: "ledger",
    rpcUrl,
  },
  { walletName: "coinbase" },
  { walletName: "status" },
  {
    walletName: "lattice",
    appName: "Yearn Finance",
    rpcUrl,
  },
  { walletName: "walletLink", rpcUrl },
  { walletName: "torus" },
  { walletName: "authereum", disableNotifications: true },
  { walletName: "trust", rpcUrl },
  { walletName: "opera" },
  { walletName: "operaTouch" },
  { walletName: "imToken", rpcUrl },
  { walletName: "meetone" },
];

export default function Web3ContextProvider({ children }) {
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [pending, setPending] = useState(false);

  const onboard = useMemo(
    () =>
      Onboard({
        dappId: process.env.BLOCKNATIVE_KEY,
        networkId: NetworkId,
        walletSelect: {
          wallets,
        },
        subscriptions: {
          wallet: (wallet) => {
            if (wallet.provider) {
              setActive(true);
              setProvider(wallet.provider);
              setLibrary(new Web3Provider(wallet.provider));
            } else {
              setActive(false);
              setProvider(undefined);
              setLibrary(undefined);
            }
          },
          address: (address) => {
            setAccount(address);
          },
        },
      }),
    [setActive, setProvider, setLibrary, setAccount]
  );

  const activate = useCallback(() => {
    setPending(true);
    onboard
      .walletSelect()
      .catch(console.error)
      .then((res) => res && onboard.walletCheck)
      .then(setActive)
      .then(() => setPending(false));
  }, [onboard, setActive]);

  const deactivate = useCallback(() => {
    setPending(true);
    onboard.walletReset();
    setPending(false);
  }, [onboard, setActive]);

  return (
    <Web3Context.Provider
      value={{
        active,
        library,
        account,
        provider,
        onboard,
        activate,
        deactivate,
        pending,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
