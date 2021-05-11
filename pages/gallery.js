import Head from "next/head";

import { Box, Stack, SimpleGrid, Container, Center } from "@chakra-ui/layout";

import Header from "../components/Header";

export default function Home() {
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
          <Container maxW="container.lg">
            <SimpleGrid minChildWidth="250px" spacing="40px">
              <Box maxH="md">
                <div className="frame">
                  <img src="/artwork/andre.png" />
                </div>
              </Box>
              <Box maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/one.png" />
                  </div>
                </a>
              </Box>
              <Box maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/two.png" />
                  </div>
                </a>
              </Box>
              <Box maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/three.png" />
                  </div>
                </a>
              </Box>
              <Box maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/four.png" />
                  </div>
                </a>
              </Box>
              <Box maxH="md">
                <div className="frame">
                  <img src="/artwork/five.png" />
                </div>
              </Box>
            </SimpleGrid>
          </Container>
        </Center>
      </Stack>
    </Box>
  );
}
