import { Box, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function ContactsChat() {
  return (
    <Box
      bg="white"
      flex="1"
      h="full"
    >
      <Flex w="full" h="64px" bg="white" boxShadow="0 1px 4px rgba(10, 10, 10, 0.12)">

      </Flex>
      <InputGroup
        position="absolute"
        bottom="12px"
        right="0"
        w="calc(100% - 64px)"
        maxW="866.3px"
        mx="12px"
        h="52px"
        bg="white"
        boxShadow="0 1px 6px #0000001f"
        borderRadius="full"
      >
        <InputLeftElement h="full" pointerEvents="none">
        </InputLeftElement>
        <Input
          placeholder="Digite uma mensagem"
          fontSize="15px"
          border="none"
          color="black"
          outline={"none"}
          _hover={{ border: "none" }}
          _focus={{
            border: "none",
            boxShadow: "none",
            outline: "none"
          }}
          _placeholder={{ color: "#666666" }}
          borderRadius="full"
          h="full"
        />
      </InputGroup>
    </Box>
  )
}