import { Box, Button, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { MoreOptIcon, NewChatIcon, WhatsAppLogo } from "../../utils/Icons";
import { useEffect, useRef, useState } from "react";
import DropdownOpt from "./DropdownOpt";

export default function ChatContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const chatOptions = [
    { icon: "group_add", label: "Novo grupo" },
    { icon: "star", label: "Mensagens favoritas" },
    { icon: "check_box", label: "Selecionar conversas" },
    { icon: "logout", label: "Desconectar" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(!isMenuOpen);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Box
      position="fixed"
      left="64px" // largura da sidebar
      top={0}
      w="340px"
      h="100vh"
      bg="#FFF"
      border="1px solid #DEDCDA"
    >
      <VStack p="10px 20px" w="full">
        <HStack justify="space-between" w="full">
          <WhatsAppLogo />
          <Flex gap={"10px"}>
            <Button
              bg="transparent"
              borderRadius={"50%"}
              w="40px"
              h="40px"
              p={0}
              _hover={{ bg: "#F7F5F3" }}
              _focus={{
                bg: "#F7F5F3",
                boxShadow: "none",
                outline: "none"
              }}
            >
              <NewChatIcon />
            </Button>
            <Button
              bg="transparent"
              borderRadius={"50%"}
              w="40px"
              h="40px"
              p={0}
              _hover={{ bg: "#F7F5F3" }}
              _focus={{
                bg: "#F7F5F3",
                boxShadow: "none",
                outline: "none"
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreOptIcon />
            </Button>
            {/*dropdown menu */}
            <DropdownOpt
              isOpen={isMenuOpen}
              menuOptions={chatOptions}
              onClose={() => setIsMenuOpen(false)}
            />
          </Flex>
        </HStack>

        <HStack>

        </HStack>
      </VStack>
    </Box>
  )
}