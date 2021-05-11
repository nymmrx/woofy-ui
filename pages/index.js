import React, { useMemo, useState } from "react";
import Image from "next/image";
import Head from "next/head";

import { Text, Box, Stack, Center, VStack, HStack } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import Header from "../components/Header";

export default function Home() {
  const [page, setPage] = useState("wrap");
  const isWrap = useMemo(() => page === "wrap", [page]);
  const isUnwrap = useMemo(() => page === "unwrap", [page]);

  const fromToken = useMemo(() => (isWrap ? "YFI" : "WOOFY"), [isWrap]);
  const toToken = useMemo(() => (isUnwrap ? "YFI" : "WOOFY"), [isUnwrap]);

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
          <Box
            bgColor="whiteAlpha.600"
            p="5"
            w="100%"
            maxW="lg"
            borderRadius="8"
            mx="5"
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
                    Wrap
                  </Button>
                  <Button
                    colorScheme="blue"
                    fontSize="xl"
                    opacity={isUnwrap ? 0.8 : 0.4}
                    onClick={() => setPage("unwrap")}
                    w={["32", "40"]}
                  >
                    Unwrap
                  </Button>
                </ButtonGroup>
              </Center>
              <VStack spacing={0} color="black" color="black">
                <Box w="100%" bg="white" p={4} borderRadius={8} boxShadow="lg">
                  <HStack spacing={5}>
                    <Box display={["none", "block"]}>
                      <Image
                        src={`/tokens/${fromToken}.png`}
                        width="64"
                        height="64"
                      />
                    </Box>
                    <Stack spacing={1}>
                      <Text fontSize="sm">Available {fromToken}</Text>
                      <Text fontSize={["xl", "2xl"]}>0.88888888888888888</Text>
                    </Stack>
                  </HStack>
                </Box>
                <Box w="90%" bg="whiteAlpha.700" px={4} py={3} boxShadow="sm">
                  <VStack>
                    <ArrowDownIcon />
                    <Box w="100%" bg="white" borderRadius={8} boxShadow="lg">
                      <InputGroup>
                        <Input height="14" />
                        <InputRightElement
                          pointerEvents="none"
                          color="gray.600"
                          fontSize="1.2em"
                          textAlign="right"
                          marginRight="5"
                          width="20"
                          justifyContent="flex-end"
                          height="14"
                          children={<Text>{fromToken}</Text>}
                        />
                      </InputGroup>
                    </Box>
                    <ArrowDownIcon />
                  </VStack>
                </Box>
                <Box w="100%" bg="white" p={4} borderRadius={8} boxShadow="lg">
                  <HStack spacing={5}>
                    <Box display={["none", "block"]}>
                      <Image
                        src={`/tokens/${toToken}.png`}
                        width="64"
                        height="64"
                      />
                    </Box>
                    <Stack spacing={1}>
                      <Text fontSize="sm">Received {toToken}</Text>
                      <Text fontSize={["xl", "2xl"]}>0.88888888888888888</Text>
                    </Stack>
                  </HStack>
                </Box>
              </VStack>
              <Button colorScheme="blackAlpha" size="lg">
                Swap
              </Button>
            </Stack>
          </Box>
        </Center>
      </Stack>
    </Box>
  );
}
