import Head from "next/head";

import { Box, Stack, Grid, Container, Center } from "@chakra-ui/layout";

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
            <Grid templateColumns="repeat(3, 1fr)" gap={8}>
              <Box w="100%" maxH="md">
                <div className="frame">
                  <img src="/artwork/andre.jpg" alt="Mona Lisa" />
                </div>
              </Box>
              <Box w="100%" maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/one.png" />
                  </div>
                </a>
              </Box>
              <Box w="100%" maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/two.png" />
                  </div>
                </a>
              </Box>
              <Box w="100%" maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/three.png" />
                  </div>
                </a>
              </Box>
              <Box w="100%" maxH="md">
                <a href="https://twitter.com/bigba_daboom">
                  <div className="frame">
                    <img src="/artwork/four.png" />
                  </div>
                </a>
              </Box>
              <Box w="100%" maxH="md">
                <div className="frame">
                  <img src="/artwork/five.png" />
                </div>
              </Box>
            </Grid>
          </Container>
        </Center>
      </Stack>
    </Box>
  );
}
