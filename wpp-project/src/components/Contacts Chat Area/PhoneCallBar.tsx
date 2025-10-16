import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

export default function PhoneCallBar() {
  return (
    <MotionFlex
      w="465.17px"
      h="111.97px"
      p="12px 20px 14px 20px"
      bg="#FFF"
      align="center"
      borderRadius="16px"
      boxShadow="0 2px 5px rgba(11, 20, 26, 0.26)"
      position={"absolute"}
      zIndex={9999}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{
        duration: 0.18,
        ease: [0.25, 0.1, 0.25, 1], // suavização
      }}
    >
      <HStack justify={"space-between"}>
        <VStack align="flex-start">
          <Text
            fontSize="17px"
            color="#0A0A0A"
            lineHeight="1.2941"
            fontWeight={400}
          >
            Faça ligações com o app para Windows
          </Text>
          <Text
            fontSize="14px"
            color="#00000099"
            lineHeight="1.14286"
            fontWeight={400}
          >
            Para começar a fazer ligações, baixe o <br />WhatsApp para Windows.
          </Text>
        </VStack>
        <Button
          w="129.17px"
          h="38px"
          p="10px 24px 10px 24px"
          bg="#1DAA61"
          _hover={{ bg: "#4ABB81" }}
          borderRadius="24px"
          boxShadow="0 2px 7px rgba(11, 20, 26, 0.09)"
        >
          <Text
            fontSize="14px"
            color="#FFF"
            lineHeight="16.0006px"
            fontWeight={545}
          >
            Baixar o app
          </Text>
        </Button>
      </HStack>
    </MotionFlex >

  )
}