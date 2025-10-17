import { Box, Button, Flex, HStack, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { NewChatIcon, WhatsAppLogo } from "../../utils/Icons";
import { useEffect, useMemo, useRef, useState } from "react";
import DropdownOpt from "./DropdownOpt";
import FilterBtns from "./FilterBtns";
import Chats from "./ChatsBox";
import { useChat } from "../../context/ChatContext";
import { chatsData } from "../../utils/chatsData";

export default function ChatContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showArchived, setShowArchived] = useState(false);
  const { countUnreadMessages, hasUnreadMessages } = useChat();

  const chatOptions = [
    { icon: "group_add", label: "Novo grupo" },
    { icon: "star", label: "Mensagens favoritas" },
    { icon: "check_box", label: "Selecionar conversas" },
    { icon: "logout", label: "Desconectar" },
  ];

  const archivedChat = useMemo(() => {
    return chatsData.find(chat => chat.id === "7");
  }, []);

  const archivedChatUnreadCount = useMemo(() => {
    if (archivedChat && hasUnreadMessages(archivedChat)) {
      return countUnreadMessages(archivedChat.messages);
    }
    return 0;
  }, [archivedChat, hasUnreadMessages, countUnreadMessages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
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
      <VStack py="10px" spacing="15px">
        {showArchived ? (
          // cabeçalho dos arquivados
          <VStack w="full" align="flex-start" spacing="15px" px="10px">
            <HStack justify="flex-start" w="full" spacing="2px">
              <Button
                bg="transparent"
                boxSize="40px"
                minW="40px"
                borderRadius="full"
                p={0}
                _hover={{ bg: "#F7F5F3" }}
                _focus={{
                  bg: "#F7F5F3",
                  boxShadow: "none",
                  outline: "none"
                }}
                onClick={() => setShowArchived(false)}
              >
                <Text
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="24px"
                  color="black"
                >
                  arrow_back
                </Text>
              </Button>
              <Text
                color="#0A0A0A"
                fontWeight={400}
                fontSize="15px"
              >
                Arquivadas
              </Text>
            </HStack>
            <Flex w="full" borderBottom="1px solid #d8d8d8" px="10px" pb="20px">
              <Text
                fontSize="14px"
                lineHeight="20px"
                fontWeight={400}
                color="#00000099"
              >
                Essas conversas permanecem arquivadas quando você recebe novas mensagens.
                Para mudar essa configuração, abra o WhatsApp no seu celular e acesse{" "}
                <Text as="span" fontWeight={700}>
                  Configurações <br /> {'>'} Conversas
                </Text>
              </Text>
            </Flex>
          </VStack>
        ) : (
          // cabeçalho normal
          <VStack w="full" align="flex-start" spacing="15px" px="20px">
            <HStack justify="space-between" w="full">
              <WhatsAppLogo />
              <Flex gap="10px" position="relative" ref={dropdownRef}>
                <Button
                  bg="transparent"
                  borderRadius="50%"
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
                  borderRadius="50%"
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
                  <Text
                    as="span"
                    className="material-symbols-outlined"
                    fontSize="24px"
                    color="black"
                  >
                    more_vert
                  </Text>
                </Button>
                {/* dropdown menu */}
                <DropdownOpt
                  isOpen={isMenuOpen}
                  menuOptions={chatOptions}
                  top="45px"
                  left="41px"
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
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="20px"
                  color="#666666"
                  lineHeight="16px"
                >
                  search
                </Text>
              </InputLeftElement>
              <Input
                placeholder="Pesquisar ou começar uma nova conversa"
                fontSize="15px"
                color="black"
                outline="none"
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

        {/* lista de contatos */}
        <VStack w="full" spacing={0}>
          {/* botão de arquivados, só aparece quando não está nos arquivados */}
          {!showArchived && (
            <Flex
              w="full"
              minH="45px"
              px="44px"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              //border="1px solid"
              cursor="pointer"
              onClick={() => setShowArchived(true)}
              align="center"
              justify="space-between"
            >
              <HStack spacing="25px" align="center" >
                <Text
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="24px"
                  color="#666666"
                >
                  archive
                </Text>
                <Text
                  color="black"
                  fontWeight={400}
                  fontSize="16px"
                >
                  Arquivadas
                </Text>
              </HStack>
              {archivedChatUnreadCount > 0 && (
                <Text
                  fontSize="12px"
                  fontWeight={600}
                  color="#1DAA61"
                >
                  {archivedChatUnreadCount}
                </Text>
              )}
            </Flex>
          )}

          {/* lista de conversas */}
          <Chats showArchived={showArchived} />
        </VStack>
      </VStack>
    </Box>
  );
}