import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Contract } from "@ethersproject/contracts";

import { Text, Box, HStack, Container, Center } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";

import { useWeb3 } from "../../helpers/web3";
import { shortenAddress } from "../../helpers/utils";

import abiErc20 from "../../abi/erc20.json";
import { formatUnits } from "../../helpers/units";

const YFI = "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e";
const WOOFY = "0xD0660cD418a64a1d44E9214ad8e459324D8157f1";

export default function Header() {
  const { active, activate, deactivate, account, pending, library } = useWeb3();
  const [userBalanceYfi, setUserBalanceYfi] = useState(0);
  const [userBalanceWoofy, setUserBalanceWoofy] = useState(0);

  useEffect(() => {
    if (active && library && account) {
      const yfiContract = new Contract(YFI, abiErc20, library);
      const woofyContract = new Contract(WOOFY, abiErc20, library);

      yfiContract.balanceOf(account).then(setUserBalanceYfi);
      woofyContract.balanceOf(account).then(setUserBalanceWoofy);
    } else {
      setUserBalanceYfi(0);
      setUserBalanceWoofy(0);
    }
  }, [active, library, account]);

  const [userDisplayToken, setUserDisplayToken] = useState(true);
  const toggleUserDisplayToken = useCallback(
    () => setUserDisplayToken(!userDisplayToken),
    [setUserDisplayToken, userDisplayToken]
  );

  const displayBalance = useMemo(
    () =>
      userDisplayToken
        ? `${formatUnits(userBalanceYfi, 18)} YFI`
        : `${formatUnits(userBalanceWoofy, 9)} WOOFY`,
    [userDisplayToken, userBalanceYfi, userBalanceWoofy]
  );

  return (
    <Container maxW="container.xl">
      <HStack py={5} wrap="wrap" spacing={0}>
        <Link href="/">
          <a>
            <HStack spacing={2}>
              <Text fontSize="5xl" fontWeight="extrabold">
                woofy
              </Text>
              <Center>
                <Image src="/tokens/WOOFY.svg" width={32} height={32} />
              </Center>
            </HStack>
          </a>
        </Link>
        <Box flexGrow={1}></Box>
        <Box>
          {(!active || !account) && (
            <Button
              colorScheme="blackAlpha"
              boxShadow="sm"
              onClick={activate}
              isLoading={pending}
            >
              Connect to a wallet
            </Button>
          )}
          {active && account && (
            <ButtonGroup isAttached boxShadow="sm">
              <Button colorScheme="blackAlpha" onClick={toggleUserDisplayToken}>
                {displayBalance}
              </Button>
              <Button
                colorScheme="whiteAlpha"
                fontFamily="monospace"
                onClick={deactivate}
              >
                {shortenAddress(account)}
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </HStack>
    </Container>
  );
}
