import fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import Link from "next/link";
import {
  Box,
  Heading,
  Flex,
  Text,
  Image,
  HStack,
  Icon,
  Button,
  Spacer,
  Tag,
  Divider,
  Hide,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import Tilt from "react-parallax-tilt";

import { AiFillGithub, AiOutlineCoffee } from "react-icons/ai";

export default function Home({ posts }) {
  const textBackground = useColorModeValue("blackAlpha.800", "gray.50");
  return (
    <div>
      <Flex color="white" mt="100px" mb="50px">
        <Box w={["100%", "65%"]} color={textBackground}>
          <Heading as="h3" size="xl" mb="20px" fontWeight="black">
            Hi, I &apos; m Aniebiet.
          </Heading>
          <Box pr="0" fontWeight="normal" fontSize="md">
            <Text mb="4">
              I &apos; m a Full-stack software engineer and AppSec enthusiast.
            </Text>
            <Text mb="4">
              I &apos; ve helped startups rapidly build, iterate on, and launch
              their ideas. <br />I possess a working style that leans towards
              collaboration and quick delivery.
            </Text>
            <HStack spacing="10px" mt="10">
              <Button colorScheme="teal" variant="outline">
                Github <Icon as={AiFillGithub} w={5} h={5} ml="3px" mt="2px" />
              </Button>

              <Button colorScheme="teal" variant="outline">
                Contact Me{" "}
              </Button>
            </HStack>
          </Box>
        </Box>
        <Spacer />
        <Hide below="md">
          <Box flex="1">
            <Tilt>
              <Box
                boxSize="sm"
                mt="0"
                borderWidth="1px"
                width="180px"
                height="260px"
                borderRadius="md"
                boxShadow="dark-lg"
              >
                <Image
                  src="/me.jpg"
                  alt="Aniebiet Udoh"
                  borderRadius="md"
                  height="258px"
                  objectFit="cover"
                />
              </Box>
            </Tilt>
          </Box>
        </Hide>
      </Flex>
      <Box mt="70px">
        <Heading as="h3" size="lg" fontWeight="normal" mb="4">
          Latest Posts
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="10">
          {posts.map((post, index) => (
            <Box
              key={index}
              height="140px"
              borderRadius="md"
              p="5"
              border="1px"
              borderColor="#b4b0b0"
              bg={"blackAlpha.50"}
            >
              <Text color="teal.800">{post.frontMatter.date}</Text>
              <Text pb="2" height="60px" fontWeight="bold" fontSize="sm">
                {post.frontMatter.title}
              </Text>
              {post.frontMatter.tags.map((eachtag, index) => (
                <Tag mr="2" key={index}>
                  <Text fontSize="xs">{eachtag}</Text>
                </Tag>
              ))}
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box mt="100px" mb="10px">
        <Heading as="h3" size="lg" mb="4" fontWeight="normal">
          Projects
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="10">
          {posts.map((post, index) => (
            <Box
              key={index}
              height="130px"
              borderRadius="md"
              p="5"
              border="1px"
              borderColor="teal.600"
            >
              <Text color="teal.800">{post.frontMatter.date}</Text>
              <Text pb="2" height="60px" fontWeight="bold" fontSize="sm">
                {post.frontMatter.title}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Box mt="20" pt="50px" mb="60px">
        <Divider colorScheme="teal" mb="40px" />

        <Heading>Stay in touch</Heading>
        <Text mt="2">
          I &apos; m open to work on exiting projects and collaborations. You
          have something that might interest me?
        </Text>
        <Button mt="1" variant="outline" colorScheme="teal">
          Email Me
        </Button>
      </Box>

      <footer>
        <Box mb="5">
          <Divider colorScheme="teal" />
          <Text fontSize={"sm"}>Built with Next JS | MDX | Chakra UI </Text>
        </Box>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: fileName.split(".")[0],
    };
  });
  return {
    props: {
      posts,
    },
  };
};
