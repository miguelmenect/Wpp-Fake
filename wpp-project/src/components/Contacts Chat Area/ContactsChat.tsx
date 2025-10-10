import { Box, Button, Flex, HStack, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useChat } from "../../context/ChatContext";
import { useState } from "react";
import { ExpressionsIcon } from "../../utils/Icons";

export default function ContactsChat() {
  const { selectedChat } = useChat();
  //valor do que foi escrito no input
  const [messageInput, setMessageInput] = useState("");
  const [isMicHovered, setIsMicHovered] = useState(false)

  const headerIcons = [
    "videocam", "search", "more_vert"
  ];

  if (!selectedChat) {
    return (
      <Box
        bg="#F7F5F3"
        flex="1"
        h="100vh"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="14px" color="#666666">
          Baixar o WhatsApp para Windows
        </Text>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.200"
      flex="1"
      h="100vh"
      position="relative"
    >
      <Flex
        w="full"
        h="64px"
        bg="white"
        boxShadow="0 1px 4px rgba(10, 10, 10, 0.12)"
        p="10px 16px 10px 16px"
        justify="space-between"
      >
        <HStack spacing="15px">
          <Image
            src={selectedChat?.avatar}
            alt={selectedChat?.name}
            boxSize="40px"
            borderRadius="full"
            objectFit="cover"
            cursor="pointer"
          />
          <Text
            color="black"
            font-size="16px"
            fontWeight={400}
            line-height="21px"
          >
            {selectedChat?.name}
          </Text>
        </HStack>

        <HStack spacing="8px">
          {headerIcons.map((icon, index) => (
            <Button
              key={index}
              _hover={{ bg: "#F7F5F3" }}
              bg="transparent"
              borderRadius="full"
              h="40px"
              px={icon === "videocam" ? "10px" : "0"}
              isDisabled={!selectedChat}
              opacity={selectedChat ? 1 : 0.5}
            >
              <HStack spacing="5px">
                <Text
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="24px"
                  color="black"
                >
                  {icon}
                </Text>
                {icon === "videocam" && (
                  //exibir somente ao lado do icone de video
                  <Text
                    as="span"
                    my="center"
                    className="material-symbols-outlined"
                    fontSize="18px"
                    color="black"
                    transform="translateX(0) rotate(90deg)"
                    transition="all 0.1s ease"
                    display="block"
                  >
                    arrow_forward_ios
                  </Text>
                )}
              </HStack>
            </Button>
          ))}
        </HStack>
      </Flex>
      <InputGroup
        position="absolute"
        bottom="12px"
        right="0"
        w="full"
        maxW="866.3px"
        mx="12px"
        h="52px"
        bg="white"
        boxShadow="0 1px 6px #0000001f"
        borderRadius="full"
      >
        <HStack
          position="absolute"
          left="5px"
          top="50%"
          transform="translateY(-50%)"
          spacing="0px"
          zIndex={2}
        >
          <Button
            bg="transparent"
            _hover={{ bg: "#F6F5F4" }}
            borderRadius={"full"}
            boxSize={"40px"}
          >
            <Text
              as="span"
              className="material-symbols-outlined"
              fontSize="24px"
              color="black"
            >
              add
            </Text>
          </Button>

          <Button
            bg="transparent"
            _hover={{ bg: "#F6F5F4" }}
            borderRadius={"full"}
            boxSize={"40px"}
            p="0"
          >
            <ExpressionsIcon width="24px" height="24px" />
          </Button>
        </HStack>
        <Input
          placeholder="Digite uma mensagem"
          fontSize="15px"
          border="none"
          color="black"
          outline={"none"}
          pl="100px"
          pr="10px"
          _hover={{ border: "none" }}
          _focus={{
            border: "none",
            boxShadow: "none",
            outline: "none"
          }}
          _placeholder={{ color: "#666666" }}
          borderRadius="full"
          h="full"
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <InputRightElement h="full" right="5px">
          {messageInput.trim() === "" ? (
            <Button
              bg="transparent"
              _hover={{ bg: "#1DAA61" }}
              borderRadius={"full"}
              onMouseEnter={() => setIsMicHovered(true)}
              onMouseLeave={() => setIsMicHovered(false)}
              boxSize={isMicHovered ? "41.6px" : "40px"}
              transition="all 0.2s ease"
            >
              <Text
                as="span"
                className="material-symbols-outlined"
                fontSize="24px"
                color={isMicHovered ? "white" : "black"}
                transition="color 0.2s ease"
                sx={{
                  "&": {
                    fontVariationSettings: isMicHovered
                      ? `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`
                      : `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`
                  }
                }}
              >
                mic
              </Text>
            </Button>
          ) : (
            <Button
              bg="#1DAA61"
              _hover={{ bg: "#1DAA61" }}
              borderRadius={"full"}
              boxSize={"40px"}
            >
              <Text
                as="span"
                className="material-symbols-rounded"
                fontSize="24px"
                color="white"
                sx={{
                  "&": {
                    fontVariationSettings:
                      `'FILL' 1, 
                        'wght' 400,
                        'GRAD' 0, 
                        'opsz' 24`
                  }
                }}
              >
                send
              </Text>
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
    </Box >
  )
}