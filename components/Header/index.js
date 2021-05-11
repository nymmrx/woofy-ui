import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Contract } from "@ethersproject/contracts";

import { Text, Box, HStack, Container } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";

import { useWeb3 } from "../../helpers/web3";
import { shortenAddress } from "../../helpers/utils";

import abiErc20 from "../../abi/erc20.json";
import { formatUnits } from "../../helpers/units";

const YFI = "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e";
const WOOFY = "0x602C71e4DAC47a042Ee7f46E0aee17F94A3bA0B6";

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

  return (
    <Container maxW="container.xl">
      <HStack py={5} wrap="wrap" spacing={0}>
        <Box flexGrow={1}>
          <Link href="/">
            <a>
              <Text fontSize="6xl" fontWeight="extrabold">
                woofy
              </Text>
            </a>
          </Link>
        </Box>
        <Box flexShrink={1}>
          {!active && (
            <Button
              colorScheme="blackAlpha"
              boxShadow="sm"
              onClick={activate}
              isLoading={pending}
            >
              Connect to a wallet
            </Button>
          )}
          {active && (
            <ButtonGroup isAttached boxShadow="sm">
              <Button colorScheme="blackAlpha">
                {formatUnits(userBalanceYfi, 18)} YFI
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
