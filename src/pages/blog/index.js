import fs from "fs";
import * as path from "path";
import matter from "gray-matter";

import {
  Spacer,
  Flex,
  Box,
  Link,
  Image,
  Icon,
  HStack,
  useColorMode,
  useColorModeValue,
  Heading,
  Button,
  Text,
  Hide,
  Tag,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FiLink } from "react-icons/fi";

export default function Blog({ posts }) {
  const textBackground = useColorModeValue("gray.700", "gray.50");

  return (
    <>
      <Box w={["100%"]} color={textBackground} mt="40px" mb={"100px"}>
        <Heading mt={"100px"} mb="50px">
          <FiLink />
          All Blog Posts
        </Heading>
        {posts.map((post, index) => {
          return (
            <Box
              mt="30px"
              key={index}
              height="150px"
              borderRadius="md"
              p="5"
              border="1px"
              borderColor="teal.600"
            >
              <Text color="teal.800">Date: {post.frontMatter.date}</Text>
              <Text pb="2" height="60px" fontWeight="bold" fontSize="md">
                <NextLink href={`/blog/${post.slug}`}>
                  {post.frontMatter.title}
                </NextLink>
              </Text>

              <HStack spacing={4}>
                {post.frontMatter.tags.map((tag, index) => {
                  return (
                    <Tag
                      key={index}
                      size={"lg"}
                      variant="solid"
                      colorScheme="teal"
                    >
                      {tag}
                    </Tag>
                  );
                })}
              </HStack>
            </Box>
          );
        })}
      </Box>
    </>
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
