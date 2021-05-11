import Link from "next/link";

import { Text, Box, HStack } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";

import { useWeb3 } from "../../helpers/web3";
import { shortenAddress } from "../../helpers/utils";

export default function Header() {
  const { active, activate, deactivate, account, pending } = useWeb3();
  return (
    <HStack py={5} px={10}>
      <Link href="/">
        <a>
          <Text fontSize="6xl" fontWeight="extrabold">
            woofy
          </Text>
        </a>
      </Link>
      <Box flexGrow={1}></Box>
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
          <Button colorScheme="blackAlpha">3 YFI</Button>
          <Button
            colorScheme="whiteAlpha"
            fontFamily="monospace"
            onClick={deactivate}
          >
            {shortenAddress(account)}
          </Button>
        </ButtonGroup>
      )}
    </HStack>
  );
}
