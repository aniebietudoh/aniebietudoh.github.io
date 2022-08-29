import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const Links = [
  { name: "About", url: "/about" },
  { name: "Blog", url: "/blog" },
  { name: "Projects", url: "/projects" },
];

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Box>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Box color="gray.500">
              <NextLink href={"/"}>aniebiet udoh</NextLink>
            </Box>
          </Flex>

          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={10}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NextLink key={index} href={link.url}>
                  {link.name}
                </NextLink>
              ))}
              <SunIcon cursor="pointer" onClick={toggleColorMode} />
            </HStack>
          </HStack>

          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NextLink key={index} href={link.url}>
                  {link.name}
                </NextLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
