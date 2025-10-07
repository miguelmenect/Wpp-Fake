import { Box, Button, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { MoreOptIcon, NewChatIcon, WhatsAppLogo } from "../../utils/Icons";
import { useEffect, useRef, useState } from "react";

export default function ChatContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuOptions = [
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
            {isMenuOpen && (
              <Box
                ref={dropdownRef}
                top="52px"
                left="270px"
                position="absolute"
                w="223px"
                minH="189px"
                bg="#FFF"
                borderRadius="16px"
                boxShadow="0 2px 8px rgba(11, 20, 26, 0.26)"
                p="20px"
                zIndex={10}
              >
                {/* conteudo do menu */}
                <VStack align={"center"} justify={"flex-start"} spacing={0}>
                  {menuOptions.map((item, index) => {
                    const isPenult = index === menuOptions.length - 2;
                    return (
                      <Box key={index}>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          w="full"
                          px={"7px"}
                          borderRadius="8px"
                          minH="40px"
                          minW="203px"
                          role="group"
                          _hover={{ bg: item.label !== "Desconectar" ? "#F6F5F4" : "#F9EBEF" }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <HStack>
                            <Text
                              as={"span"}
                              className="material-symbols-outlined"
                              fontSize={"24px"}
                              color={"#626262"}
                              _groupHover={{ color: item.label === "Desconectar" ? "#B80531" : "#626262" }}
                              lineHeight={"16px"}
                            >
                              {item.icon}
                            </Text>
                            <Text
                              color={"#626262"}
                              fontSize={"16px"}
                              fontWeight={400}
                              lineHeight={"16px"}
                              fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
                              _groupHover={{ color: item.label === "Desconectar" ? "#B80531" : "#626262" }}
                            >
                              {item.label}
                            </Text>
                          </HStack>
                        </Button>
                        {isPenult && (
                          <Divider w="full" h="1px" bg="#E5E5E5" my="5px" />
                        )}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            )}
          </Flex>
        </HStack>

        <HStack>

        </HStack>
      </VStack>
    </Box>
  )
}