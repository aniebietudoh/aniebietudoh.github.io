import {
  Spacer,
  Flex,
  Box,
  Image,
  Icon,
  useColorModeValue,
  Heading,
  Text,
  Hide,
  ListItem,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";
import { FiTool, FiCode } from "react-icons/fi";
import Tilt from "react-parallax-tilt";

const About = () => {
  const textBackground = useColorModeValue("gray.700", "gray.50");

  return (
    <>
      <Flex mt="80px">
        <Box w={["100%", "65%"]} color={textBackground}>
          <Heading as="h3" size="xl" mb="20px" fontWeight="black">
            I&apos;m Aniebiet Udoh Robert.
          </Heading>
          <Box pr="0" fontWeight="normal" fontSize="lg">
            <Text mb="4">
              A Full-stack software engineer and AppSec enthusiast.
            </Text>
            <Text mb="4">
              Over the years, I&apos;ve helped startups and medium scale
              businesses rapidly build, iterate on, and launch and scale their
              ideas. <br /> I possess a working style that leans towards
              collaboration and quick delivery.
            </Text>
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
                width="260px"
                height="260px"
                borderRadius="full"
                boxShadow="dark-lg"
              >
                <Image
                  src="/me.jpg"
                  alt="Aniebiet Udoh"
                  borderRadius="full"
                  height="258px"
                  objectFit="cover"
                />
              </Box>
            </Tilt>
          </Box>
        </Hide>
      </Flex>

      <Box w={["100%", "65%"]} color={textBackground} mt="40px">
        <Box pr="0" fontWeight="normal" fontSize="md">
          <Heading
            size="md"
            mb="20px"
            fontWeight="black"
            fontSize={"3xl"}
            pt="50px"
          >
            My tools
          </Heading>
          <Divider mt={2} mb={4} border={"1px"} />

          <Heading as="h3" size="md" mb="20px" fontWeight="black">
            <Icon>
              <FiTool />
            </Icon>{" "}
            Hardware
          </Heading>
          <UnorderedList>
            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                Coding:
              </Text>{" "}
              ASUS ROG FLOW AMD Ryzen 9 5900HS with Radeon Graphics 3.30 GHz
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                External Monitor:{" "}
              </Text>{" "}
              HP 27f, 68.6 cm 27 in Display.
            </ListItem>

            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                Headphones:
              </Text>{" "}
              Oraimo BoomPop Booming Bass Wireless Headphone, HD Audio
            </ListItem>

            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                Microphones:
              </Text>{" "}
              HXSJ F18 Plug And Play 2.4G Wireless Microphone
            </ListItem>
          </UnorderedList>
        </Box>

        <Box pr="0" fontWeight="normal" fontSize="md" mt="60px" mb="60px">
          <Heading as="h3" size="md" mb="20px" fontWeight="black">
            <Icon>
              <FiCode />
            </Icon>{" "}
            Software
          </Heading>
          <UnorderedList>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Coding:
              </Text>{" "}
              Visual Studio Code / WebStorm IDE
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                Notes:
              </Text>{" "}
              Notion
            </ListItem>

            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                Design:
              </Text>{" "}
              Figma, Gimp
            </ListItem>

            <ListItem>
              <Text fontWeight={"bold"} as={"span"}>
                Music:
              </Text>{" "}
              Spotify
            </ListItem>
          </UnorderedList>
        </Box>

        <Box pr="0" fontWeight="normal" fontSize="md" mt="30px" mb="100px">
          <Heading as="h3" size="md" mb="20px" fontWeight="black">
            <Icon>
              <FiCode />
            </Icon>{" "}
            Languages/ Frameworks / Cloud / Concepts
          </Heading>
          <UnorderedList>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Languages:
              </Text>{" "}
              TypeScript, JavaScript, Python, Golang, SQL, GraphQL, JSON, HTML5,
              CSS3
            </ListItem>
            <ListItem mt="2">
              <Text fontWeight={"bold"} as={"span"}>
                Framwworks/Libraries:
              </Text>{" "}
              Next JS, React JS, Express JS, Nest JS, Flask, Vue JS, Node Js,
              React Native, Tailwind, Chakra UI
            </ListItem>

            <ListItem mt="2">
              <Text fontWeight={"bold"} as={"span"}>
                Cloud:
              </Text>{" "}
              AWS, Serverless, AWS Lambda, Digital ocean, DynamoDB
            </ListItem>

            <ListItem mt="2">
              <Text fontWeight={"bold"} as={"span"}>
                Concepts:
              </Text>{" "}
              Design Patterns (REST API, MVC), OWASP, Databases (Postgres, SQL,
              MongoDB), Authentication and Security (OAuth2, OpenID Connect,
              SSO, JWT), Linux/UNIX Administration, Webpack, Version Control
              (Git), AWS Infrastructure (EC2, Route 53, RDS), Testing (Unit,
              Component, Integration, End-to-end), Web Application Development
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </>
  );
};

export default About;
