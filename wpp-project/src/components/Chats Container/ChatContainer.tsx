import { Box, Button, Flex, HStack, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { MoreOptIcon, NewChatIcon, WhatsAppLogo } from "../../utils/Icons";
import { useEffect, useRef, useState } from "react";
import DropdownOpt from "./DropdownOpt";
import FilterBtns from "./FilterBtns";
import Chats from "./ChatsBox";

export default function ChatContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  //condição para exibir os contatos arquivados
  const [showArchived, setShowArchived] = useState(false);

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
      w="409px"
      h="100vh"
      bg="#FFF"
      border="1px solid #DEDCDA"
      flexShrink={0}
    >
      <VStack p="10px 20px" >
        {!showArchived && (
          <VStack w="full" align={"flex-start"} spacing={"15px"}>
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
                  linePosition={2}
                  onClose={() => setIsMenuOpen(false)}
                />
              </Flex>
            </HStack>

            <InputGroup
              w="full"
              h="40px"
              bg="#F6F5F4"
              borderRadius="full"
            >
              <InputLeftElement h="full" pointerEvents="none">
                <Text
                  as={"span"}
                  className="material-symbols-outlined"
                  fontSize={"20px"}
                  color={"#666666"}
                  lineHeight={"16px"}
                >
                  search
                </Text>
              </InputLeftElement>
              <Input
                placeholder="Pesquisar ou começar uma nova conversa"
                fontSize="15px"
                color="black"
                outline={"none"}
                border="1px solid transparent"
                _hover={{
                  border: "1px solid #C5C4C3",
                }}
                _focus={{
                  border: "2px solid #1DAA61",
                  boxShadow: "none",
                  outline: "none"
                }}
                _placeholder={{ color: "#666666" }}
                borderRadius="full"
                h="full"
              />
            </InputGroup>
            <FilterBtns />
          </VStack>
        )}
        <VStack>
          {/*chats de conversa */}
          <Button w="full" bg="transparent" _hover={{ bg: "transparent" }} onClick={() => setShowArchived(!showArchived)}>
            <HStack align={"center"} w="full" spacing="27px" >
              <Text
                as={"span"}
                className="material-symbols-outlined"
                fontSize={"24px"}
                color={"#666666"}
              >
                {showArchived ? 'arrow_back' : 'archive'}
              </Text>
              <Text
                color="black"
                fontWeight={400}
                fontSize="16px"
              >
                Arquivadas
              </Text>
            </HStack>
            {!showArchived && (<Text
              fontSize="12px"
              fontWeight={545}
              color="#1DAA61"
            >
              1
            </Text>)}
          </Button>
          <Chats showArchived={showArchived} />
        </VStack>
      </VStack>
    </Box >
  )
}