import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Head from "next/head";

import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "bignumber.js";

import {
  Text,
  Box,
  Stack,
  Center,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { ArrowDownIcon } from "@chakra-ui/icons";

import Header from "../components/Header";

import { useWeb3 } from "../helpers/web3";
import { formatUnits } from "../helpers/units";

import abiErc20 from "../abi/erc20.json";
import NumericInput from "../components/NumericInput";

const YFI = "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e";
const WOOFY = "0x602C71e4DAC47a042Ee7f46E0aee17F94A3bA0B6";
const TEN = new BigNumber(10);
const MAX = new BigNumber(2).pow(256).minus(1);

export default function Home() {
  const [page, setPage] = useState("wrap");
  const isWrap = useMemo(() => page === "wrap", [page]);
  const isUnwrap = useMemo(() => page === "unwrap", [page]);

  const { active, account, library } = useWeb3();

  const [userBalanceYfi, setUserBalanceYfi] = useState(0);
  const [userBalanceWoofy, setUserBalanceWoofy] = useState(0);
  const [userAllowanceYfi, setUserAllowanceYfi] = useState(0);

  const yfi = useMemo(
    () => ({
      name: "YFI",
      image: "/tokens/YFI.png",
      address: YFI,
      decimals: 18,
      balance: new BigNumber(userBalanceYfi.toString()),
      allowance: new BigNumber(userAllowanceYfi.toString()),
    }),
    [userBalanceYfi]
  );

  const woofy = useMemo(
    () => ({
      name: "WOOFY",
      address: WOOFY,
      image: "/tokens/WOOFY.png",
      decimals: 9,
      balance: new BigNumber(userBalanceWoofy.toString()),
      allowance: MAX,
    }),
    [userBalanceWoofy]
  );

  const fromToken = useMemo(() => (isWrap ? yfi : woofy), [yfi, woofy, isWrap]);
  const toToken = useMemo(
    () => (isUnwrap ? yfi : woofy),
    [yfi, woofy, isUnwrap]
  );

  const [value, setValue] = useState("");
  const input = useMemo(
    () =>
      new BigNumber(
        (value.endsWith(".") ? value.slice(0, -1) : value) || "0"
      ).times(TEN.pow(fromToken.decimals)),
    [value, fromToken]
  );

  const inputValid = useMemo(
    () => !active || !input.gt(fromToken.balance),
    [active, input, fromToken]
  );

  const needsApproval = useMemo(
    () => fromToken.name !== "WOOFY",
    [active, input, fromToken]
  );

  console.log(fromToken, needsApproval);

  const approveValid = useMemo(
    () => input.lte(fromToken.balance) && input.gt(0),
    [input, fromToken]
  );

  const swapValid = useMemo(
    () => input.lte(fromToken.allowance) && approveValid,
    [input, fromToken, approveValid]
  );

  const output = useMemo(() => input, [input]);

  useEffect(() => {
    if (active && library && account) {
      const yfiContract = new Contract(YFI, abiErc20, library);
      const woofyContract = new Contract(WOOFY, abiErc20, library);

      yfiContract.balanceOf(account).then(setUserBalanceYfi);
      woofyContract.balanceOf(account).then(setUserBalanceWoofy);

      yfiContract.allowance(account, WOOFY).then(setUserAllowanceYfi);
    } else {
      setUserBalanceYfi(0);
      setUserBalanceWoofy(0);
      setUserAllowanceYfi(0);
    }
  }, [active, library, account]);

  const approve = useCallback(() => {
    const fromContract = new Contract(
      fromToken.address,
      abiErc20,
      library.getSigner(account)
    );
    fromContract.approve(toToken.address);
  }, [fromToken, toToken, library, account]);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-l, pink.400,blue.500)"
      color="white"
    >
      <Head>
        <title>woofy</title>
      </Head>
      <Stack spacing={10}>
        <Header />
        <Center>
          <Container>
            <Box
              bgColor="whiteAlpha.600"
              p="5"
              w="100%"
              maxW="lg"
              borderRadius="8"
            >
              <Stack spacing={6}>
                <Center>
                  <ButtonGroup isAttached>
                    <Button
                      colorScheme="pink"
                      fontSize="xl"
                      opacity={isWrap ? 0.8 : 0.4}
                      onClick={() => setPage("wrap")}
                      w={["32", "40"]}
                    >
                      Woof
                    </Button>
                    <Button
                      colorScheme="blue"
                      fontSize="xl"
                      opacity={isUnwrap ? 0.8 : 0.4}
                      onClick={() => setPage("unwrap")}
                      w={["32", "40"]}
                    >
                      Unwoof
                    </Button>
                  </ButtonGroup>
                </Center>
                <VStack spacing={0} color="black" color="black">
                  <Box
                    w="100%"
                    bg="white"
                    p={4}
                    borderRadius={8}
                    boxShadow="lg"
                  >
                    <Stack spacing={2}>
                      <Text fontSize="sm">
                        <span>Balance: </span>
                        {fromToken.balance.gt(0)
                          ? formatUnits(fromToken.balance, fromToken.decimals)
                          : "-"}
                      </Text>
                      <NumericInput
                        value={value}
                        onChange={setValue}
                        invalid={!inputValid}
                        element={
                          <Image src={fromToken.image} width="32" height="32" />
                        }
                      />
                    </Stack>
                  </Box>
                  <Box w="90%" bg="whiteAlpha.700" px={4} py={3} boxShadow="sm">
                    <Center>
                      <ArrowDownIcon />
                    </Center>
                  </Box>
                  <Box
                    w="100%"
                    bg="white"
                    p={4}
                    borderRadius={8}
                    boxShadow="lg"
                  >
                    <Stack spacing={2}>
                      <Text fontSize="sm">
                        <span>Balance: </span>
                        {toToken.balance.gt(0)
                          ? formatUnits(fromToken.balance, fromToken.decimals)
                          : "-"}
                      </Text>
                      <NumericInput
                        disabled
                        value={formatUnits(output, toToken.decimals)}
                        token={toToken.name}
                        element={
                          <Image src={toToken.image} width="32" height="32" />
                        }
                      />
                    </Stack>
                  </Box>
                </VStack>
                <HStack width="100%">
                  {needsApproval && (
                    <Button
                      width="100%"
                      colorScheme="blackAlpha"
                      size="lg"
                      disabled={!approveValid}
                    >
                      Approve
                    </Button>
                  )}
                  <Button
                    width="100%"
                    colorScheme="blackAlpha"
                    size="lg"
                    disabled={!swapValid}
                  >
                    {isWrap ? "Woof" : "Unwoof"}
                  </Button>
                </HStack>
              </Stack>
            </Box>
          </Container>
        </Center>
      </Stack>
    </Box>
  );
}
