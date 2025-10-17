import { Box, VStack, Flex, HStack, Image, Button, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { DoubleCheck } from "../../utils/Icons";
import ReactionBar from "./ReactionBar";
import { AnimatePresence } from "framer-motion";

export default function Messages() {
  const [isTextHovered, setIsTextHovered] = useState<string | null>(null);
  const [reactionBarOpen, setReactionBarOpen] = useState<string | null>(null);
  const [reactionBarPos, setReactionBarPos] = useState({ top: 0, left: 0, right: 0 });
  const reactionBarRef = useRef<HTMLDivElement | null>(null);
  const { selectedChat } = useChat();

  const colorsNames = ["#06CF9C", "#A5B337", "#53BDEB", "#7F66FF",];

  //função para pegar os valores de cor de colorsNames
  const getColorForSender = (senderName: string) => {
    if (!selectedChat?.isGroup) return "#000";

    // pega todos os nomes únicos do chat atual
    const uniqueSenders = Array.from(
      new Set(
        selectedChat.messages
          .filter(m => m.sender === "contact" && m.senderName)
          .map(m => m.senderName)
      )
    );

    // Encontra o índice do sender atual na lista ordenada
    const senderIndex = uniqueSenders.indexOf(senderName);

    // Retorna a cor correspondente (com wrap caso tenha mais pessoas que cores)
    return colorsNames[senderIndex % colorsNames.length];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  //abre reactionbar
  const toggleReactionBar = (messageId: string, buttonElement: HTMLButtonElement, sender: "user" | "contact") => {
    if (reactionBarOpen === messageId) {
      setReactionBarOpen(null);
      return;
    }

    const rect = buttonElement.getBoundingClientRect();
    setReactionBarPos({
      top: rect.top - 67, // 67px acima do botão
      left: sender === "user" ? rect.right + 0 : 535, // 535px à direita do botão (user)
      right: sender === "contact" ? window.innerWidth - rect.left + 0 : 351, // 351px à esquerda do botão (contact)
    });
    setReactionBarOpen(messageId);
  };

  //fecha reactionbar
  useEffect(() => {
    if (!reactionBarOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      //se a reactionbar existe e o clique foi fora dela então fecha reactionbar
      if (reactionBarRef.current && !reactionBarRef.current.contains(e.target as Node)) {
        setReactionBarOpen(null);
      }
    };
    //evento para detectar cliques na tela
    document.addEventListener("mousedown", handleClickOutside);
    // remove o evento ao fechar a reactionbar ou desmontar o componente
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [reactionBarOpen]);

  const ReactionBtn = ({ messageId, sender }: { messageId: string; sender: "user" | "contact" }) => (
    <Button
      boxSize="26px"
      minW="26px"
      borderRadius="full"
      bg="#FFF"
      _hover={{ bg: "#FFF" }
      }
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.1)"
      _focus={{ boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.1)" }}
      p="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={(e) => {
        toggleReactionBar(messageId, e.currentTarget, sender);
      }}
    >
      <Text
        as="span"
        my="center"
        className="material-symbols-outlined"
        fontSize="20px"
        color="#00000099"
      >
        mood
      </Text>
    </Button >
  );

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
        <VStack
          h="full"
          justify={"center"}
        >
          <Image
            h="228px"
            w="228px"
            src="/img/various/banner_wpp.png"
            p={0}
          />
          <VStack
            spacing="12px"
            mb="20px"
          >
            <Text fontSize="36px" color="#0A0A0A" lineHeight="36px" fontWeight={200}>
              Baixar o WhatsApp para Windows
            </Text>
            <Text fontSize="16px" color="#0A0A0A" lineHeight="16px" textAlign="center">
              Baixe o novo app para Windows para fazer ligações, usar o compartilhamento <br />
              de tela e ter uma experiência de uso mais rápida.
            </Text>
          </VStack>
          <Button
            w="89px"
            h="38px"
            borderRadius="full"
            bg="#1DAA61"
            _hover={{ bg: "#1DAA61" }}
          >
            <Text
              color="white"
              fontWeight={500}
              fontSize={"14px"}
              line-height="16.0006px"
            >
              Baixar
            </Text>
          </Button>
          <HStack
            bottom="40px"
            position={"absolute"}
            justify="center"
            spacing="5px"
          >
            <Text
              as="span"
              className="material-symbols-rounded"
              fontSize="20px"
              color="#00000099"
            >
              lock
            </Text>
            <Text
              fontSize={"14px"}
              lineHeight={"20px"}
              color="#00000099"
            >
              Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta.
            </Text>
          </HStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      p={selectedChat.isGroup ? "20px 57px 20px 30px" : "20px 57px 20px 62px"}
      overflowY={"auto"}
      h="calc(100vh - 64px - 76px)"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      {/**chat de conversa selecionado */}
      <VStack
        spacing="2px"
        align="stretch"
      >
        {selectedChat.messages.map((message, index) => {
          const prevMessage = selectedChat.messages[index - 1];
          //verifica se existe alguma mensagem antes da mensagem atual, se não houver
          //é o primeiro balão de mensagem
          const isFirstOfSender = !prevMessage ||
            //ou se o remetente da mensagem anterior é diferente do remetente atual
            prevMessage.sender !== message.sender ||
            //ou, se for um grupo, verifica se o nome do contato 
            //anterior é diferente (ou seja, mudou o remetente dentro do grupo)
            (selectedChat.isGroup &&
              message.sender === "contact" &&
              prevMessage.senderName !== message.senderName);

          //verifica se a mensagem atual é a última de um mesmo remetente
          //se sim então significa que é a última mensagem

          return (
            <Flex
              key={message.id}
              justify={message.sender === "user" ? "flex-end" : "flex-start"}
              onMouseEnter={() => setIsTextHovered(message.id)}
              onMouseLeave={() => setIsTextHovered(null)}
              mb={selectedChat.isGroup ? "12px" : "1px"}
              position="relative"
            >
              <HStack spacing="5px">
                {selectedChat.isGroup && message.sender === "contact" && (
                  <Image
                    boxSize="28px"
                    src={message.senderAvatar}
                    alt={message.senderName}
                    borderRadius={"full"}
                    mb="20px"
                    cursor="pointer"
                  />
                )}
                <Box>
                  {isTextHovered === message.id && message.sender === "user" && (
                    <ReactionBtn messageId={message.id} sender={message.sender} />
                  )}
                </Box>
                <Flex
                  bg={message.sender === "user" ? "#D9FDD3" : "#FFF"}
                  borderRadius="7.5px"
                  minH="34px"
                  boxShadow="0 1px 0.5px rgba(11, 20, 26, 0.13)"
                  position="relative"
                  maxW="528.97px"
                  sx={{
                    ...(isFirstOfSender && {
                      "&::after": {
                        content: "''",
                        position: "absolute",
                        top: "0px",
                        width: 0,
                        height: 0,
                        borderStyle: "solid",
                        // balão do usuário com flechinha
                        ...(message.sender === "user"
                          ? {
                            right: "-6px",
                            borderWidth: "0px 0 13px 13px",
                            borderColor: "transparent transparent transparent #D9FDD3",
                          }
                          // balão do contato com flechinha
                          : {
                            left: "-6px",
                            borderWidth: "0px 13px 13px 0",
                            borderColor: "transparent #FFF transparent transparent",
                          }),
                      },
                    }),
                  }}
                >
                  <HStack
                    w="full"
                    alignItems="flex-end"
                  >
                    <VStack align="flex-start" p="6px 7px 8px 9px" spacing="2px">
                      {selectedChat.isGroup && message.sender === "contact" && (
                        <Text
                          fontWeight={500}
                          fontSize="12.8px"
                          color={getColorForSender(message.senderName || "")}
                          _hover={{ textDecoration: "underline" }}
                          cursor="pointer"
                        >
                          {message.senderName}
                        </Text>
                      )}
                      <Text
                        color="#0A0A0A"
                        fontSize="14.2px"
                        fontWeight={400}
                        lineHeight="19px"
                        whiteSpace="pre-wrap"
                        wordBreak="break-word"
                      >
                        {message.text}
                      </Text>
                    </VStack>
                    <HStack
                      alignSelf="flex-end"
                      flexShrink={0}
                      p="0px 7px 2.5px 0px"
                      spacing="3px"
                    >
                      <Text
                        color="#00000099"
                        fontSize="11px"
                        lineHeight="15px"
                        whiteSpace="nowrap"
                      >
                        {formatTime(message.timestamp)}
                      </Text>
                      {message.sender === "user" && (
                        <DoubleCheck />
                      )}
                    </HStack>
                  </HStack>
                </Flex>
                <Box>
                  {isTextHovered === message.id && message.sender === "contact" && (
                    <ReactionBtn messageId={message.id} sender={message.sender} />
                  )}
                </Box>
              </HStack>
              <AnimatePresence>
                {reactionBarOpen === message.id && (
                  <Box
                    ref={reactionBarRef}
                    position="fixed"
                    top={`${reactionBarPos.top}px`}
                    left={message.sender === "contact" ? `${reactionBarPos.left}px` : "auto"}
                    right={message.sender === "user" ? `${reactionBarPos.right}px` : "auto"}
                    zIndex={9999}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ReactionBar onClose={() => setReactionBarOpen(null)} />
                  </Box>
                )}
              </AnimatePresence>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}