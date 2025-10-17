import { Box, Button, Flex, HStack, Image, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { useChat } from "../../context/ChatContext";
import { useEffect, useRef, useState } from "react";
import { ExpressionsIcon } from "../../utils/Icons";
import Messages from "./TextMessages";
import { AnimatePresence } from "framer-motion";
import PhoneCallBar from "./PhoneCallBar";
import DropdownOpt from "../Chats Container/DropdownOpt";

export default function ContactsChat() {
  const { selectedChat, updateChatMessages } = useChat();
  //valor do que foi escrito no input
  const [messageInput, setMessageInput] = useState("");
  //estado do dropdonw do header
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //estado do dropdonw do botão "+" no input
  const [isMediaBtnOpen, setIsMediaBtnOpen] = useState(false);
  const [isMicHovered, setIsMicHovered] = useState(false);
  //estado do container de ligação
  const [isPhoneCallOpen, setIsPhoneCallOpen] = useState(false);
  const callContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //fecha container ou dropdonw ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (callContainerRef.current && !callContainerRef.current.contains(event.target as Node)) {
        setIsPhoneCallOpen(false);
      }
    };

    if (isPhoneCallOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPhoneCallOpen]);

  //função que faz o envio de mensagem
  const handleSendMessage = () => {
    //não faz exexução se nenhum chat selecionado ou input vazio
    if (!selectedChat || messageInput.trim() === "") return;

    const newMessage = {
      id: `${Date.now()}`,
      sender: "user" as const, //remetente da mensagem sempre como usuario nunca contao
      text: messageInput.trim(),
      timestamp: new Date(), //data e hora atual do momento do envio da mensagem
    };

    updateChatMessages(selectedChat.id, newMessage);
    setMessageInput(""); //deixa input vazio pós o envio de uma mensagem

    // foca no input após enviar mensagem
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // função para enviar mensagem ao apertar "enter"
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  //opções do dropdonw de contato do header
  const contactOpt = [
    { icon: "info", label: selectedChat?.isGroup ? "Dados do grupo" : "Dados do contato" },
    { icon: "check_box", label: "Selecionar mensagens" },
    { icon: "notifications_off", label: "Desativar notificações" },
    { icon: "search_activity", label: "Mensagens temporárias" },
    { icon: "favorite", label: "Adicionar aos favoritos" },
    { icon: "cancel", label: "Fechar conversa" },
    { icon: selectedChat?.isGroup ? "" : "thumb_down", label: selectedChat?.isGroup ? "" : "Denunciar" },
    { icon: selectedChat?.isGroup ? "" : "block", label: selectedChat?.isGroup ? "" : "Bloquear" },
    { icon: "do_not_disturb_on", label: "Limpar conversa" },
    { icon: selectedChat?.isGroup ? "logout" : "delete", label: selectedChat?.isGroup ? "Sair do grupo" : "Apagar conversa" },
  ];

  const mediaMenu = [
    { icon: "docs", label: "Documento", color: "#7F66FF" },
    { icon: "filter", label: "Fotos e vídeos", color: "#007BFC" },
    { icon: "photo_camera", label: "Câmera", color: "#FF2E74" },
    { icon: "headphones", label: "Áudio", color: "#FA6533" },
    { icon: "person", label: "Contato", color: "#009DE2" },
    { icon: "ballot", label: "Enquete", color: "#FFB938" },
    { icon: "event", label: "Evento", color: "#FF2E74" },
    { icon: "sticky_note", label: "Nova figurinha", color: "#06CF9C" },
  ];

  const headerIcons = [
    "videocam", "search", "more_vert"
  ];

  const groupMembers = [
    "Carlos Aarav",
    "Clara Gestora",
    "Daniel Youssef",
    "Dr. Thiago Tamagushi",
    "Você"
  ];

  if (!selectedChat) {
    return <Messages />;
  }

  return (
    <Box
      bg="#F5F1EB"
      flex="1"
      h="100vh"
      position="relative"
    >
      <Box
        backgroundImage={`url("/img/various/background-chat.png")`}
        h="full"
        w="full"
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
            <VStack w="full" spacing="0px" align={"start"}>
              <Text
                color="black"
                fontSize="16px"
                fontWeight={400}
                line-height="21px"
              >
                {selectedChat?.name}
              </Text>
              {selectedChat.isGroup && (
                <Text
                  color="#666666"
                  fontSize="13px"
                  fontWeight={400}
                  line-height="20px"
                >
                  {groupMembers.join(", ")}
                </Text>
              )}
            </VStack>
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
                onClick={() => {
                  if (icon === "videocam") {
                    setIsPhoneCallOpen((prev) => !prev);
                  } else if (icon === "more_vert") {
                    setIsMenuOpen(true);
                  }
                }}
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

        {/*dropdonw*/}
        <DropdownOpt
          isOpen={isMenuOpen}
          w="244.59px"
          top={"55px"}
          right={"21px"}
          menuOptions={contactOpt}
          linePosition={5}
          onClose={() => setIsMenuOpen(false)}
        />
        {/*container de ligar*/}
        <AnimatePresence>
          {isPhoneCallOpen && (
            //container de chamada/ligação com efeito 
            <Box ref={callContainerRef} position="absolute" top="55px" right="570px">
              <PhoneCallBar />
            </Box>
          )}
        </AnimatePresence>

        {/** componente com balãozinhos das mensagens */}
        < Messages />
        {/** input de texto */}
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
            <DropdownOpt
              isOpen={isMediaBtnOpen}
              roundedType={true}
              w="196.58px"
              bottom={"50px"}
              right={"0px"}
              isFilled={true}
              menuOptions={mediaMenu}
              onClose={() => setIsMediaBtnOpen(false)}
            />
            <Button
              bg="transparent"
              _hover={{ bg: "#F6F5F4" }}
              _focus={{
                bg: isMediaBtnOpen ? "#F6F5F4" : "transparent"
              }}
              borderRadius={"full"}
              boxSize={"40px"}
              onClick={() => setIsMediaBtnOpen(true)}
              transition="background 0.2s ease"
            >
              <Text
                as="span"
                className="material-symbols-outlined"
                fontSize="24px"
                color="black"
                transition="transform 0.3s ease"
                transform={isMediaBtnOpen ? "rotate(135deg)" : "rotate(0deg)"}
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
            ref={inputRef}
            value={messageInput}
            placeholder="Digite uma mensagem"
            fontSize="15px"
            border="none"
            color="black"
            outline={"none"}
            pl="91px"
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
            onKeyPress={handleKeyPress}
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
                onClick={handleSendMessage}
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
    </Box >
  )
}