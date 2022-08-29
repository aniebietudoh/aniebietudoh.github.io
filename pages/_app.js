// import "../styles/globals.css";
import {
  ChakraProvider,
  Container,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Navigation from "../components/Navigation";

import "@fontsource/poppins/900.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";

import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <Head>
          <title> aniebiet.dev </title>
        </Head>
        <div>
          <Navigation />
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
