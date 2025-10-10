import { Box, HStack, Image, VStack, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { chatsData } from "../../utils/chatsData";
import DropdownOpt from "./DropdownOpt";
import { useChat } from "../../context/ChatContext";

//formata mensagens de acordo com seu tempo
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (60 * 60 * 1000));

  // se foi hoje mostra a hora
  if (diffInHours < 24 && date.getDate() === now.getDate()) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (diffInHours < 24 * 7) {
    //caso tenha sido semana, mostra o dia da semana
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  } else {
    // se a mais tempo, mostra a data
    return date.toLocaleDateString('pt-BR');
  }
};

//resume a mensagem no seu preview
const truncateMessage = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  //se mensagem for maior que maxlength formata com o "..." no final
  return text.slice(0, maxLength) + "...";
};


interface ChatsProps {
  showArchived: boolean;
}

export default function Chats({ showArchived }: ChatsProps) {
  //armazena id do chat que esta com hover
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  //armazena id do chat que tem o dropdown aberto
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const { selectedChat, setSelectedChat } = useChat();

  //ordena os containers de chat baseada na mensagem mais recente
  const sortedChats = useMemo(() => {
    return [...chatsData].sort((a, b) => {
      //compara as ultimas mensagens para ordenar os containers de chat
      const lastMessageA = a.messages[a.messages.length - 1];
      const lastMessageB = b.messages[b.messages.length - 1];
      //captura valor de ultima mensagem enviada para exibir no preview
      return lastMessageB.timestamp.getTime() - lastMessageA.timestamp.getTime();
    });
  }, []);

  // Opções do menu dropdown
  const menuOptions = [
    { icon: "archive", label: "Arquivar conversa" },
    { icon: "notifications", label: "Reativar notificações" },
    { icon: "keep", label: "Fixar conversa" },
    { icon: "mark_unread_chat_alt", label: "Marcar como não lida" },
    { icon: "favorite", label: "Adicionar aos favoritos" },
    { icon: "block", label: "Bloquear" },
    { icon: "delete", label: "Apagar conversa" },
  ];

  // função para abrir/fechar dropdown
  const handleDropdownToggle = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // impede que o click propague para o Box do chat
    setOpenDropdownId(openDropdownId === chatId ? null : chatId);
  };

  //função que define qual chat de contato foi clicado
  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
  };

  const filteredChats = useMemo(() => {
    if (showArchived) {
      // Mostra apenas o chat de id 7 (arquivado)
      return sortedChats.filter(chat => chat.id === "7");
    } else {
      // Mostra apenas os chats de id 1 a 6
      return sortedChats.filter(chat => chat.id !== "7");
    }
  }, [sortedChats, showArchived]);

  return (
    <VStack w="full" spacing="0px" align="flex-start">
      {filteredChats.map((chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        const isSelected = selectedChat?.id === chat.id;
        return (
          <Box
            key={chat.id}
            h="72px"
            w="full"
            display="flex"
            position="relative"
            alignItems="center"
            cursor={"pointer"}
            bg={isSelected ? "#F7F5F3" : "transparent"}
            borderRadius={"12px"}
            _hover={{ bg: "#F7F5F3" }}
            onMouseEnter={() => setHoveredChatId(chat.id)}
            onMouseLeave={() => setHoveredChatId(null)}
            onClick={() => handleChatClick(chat)}
          >
            <HStack w="full" spacing="12px" justify="space-between" p="0px 15px 0px 10px" align="center">
              {/* imagem de perfil + nome e mensagem */}
              <Image
                src={chat.avatar}
                alt={chat.name}
                w="49px"
                h="49px"
                borderRadius="full"
                objectFit="cover"
              />
              <VStack align="flex-start" spacing="2px" flex="1">
                <Text
                  fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
                  fontSize="16px"
                  fontWeight="400"
                  color="black"
                  noOfLines={1}
                >
                  {chat.name}
                </Text>
                <Text
                  fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
                  fontSize="14px"
                  fontWeight="400"
                  color="#666666"
                  noOfLines={1}
                  textAlign="start"
                >
                  {/*max 46 caracteres e então resume a mensagem */}
                  {truncateMessage(lastMessage.text, 46)}
                </Text>
              </VStack>
              {/* hora + icone de dropdonw */}
              <VStack
                spacing="4px"
                align="flex-end"
                h="49px"
                justify="space-between"
              >
                <Text
                  fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
                  fontSize="12px"
                  fontWeight="400"
                  color="#666666"
                  flexShrink={0}
                >
                  {formatTimestamp(lastMessage.timestamp)}
                </Text>
                <Box h="16px" position="relative" onClick={(e) => handleDropdownToggle(chat.id, e)}>
                  <Text as="span"
                    className="material-symbols-outlined"
                    fontSize="16px"
                    color="#636261"
                    transform={hoveredChatId === chat.id
                      ? "translateX(0) rotate(90deg)"
                      : "translateX(12px) rotate(90deg)"
                    }
                    opacity={hoveredChatId === chat.id ? 1 : 0}
                    transition="all 0.1s ease"
                    display="block"
                  >
                    arrow_forward_ios
                  </Text>
                </Box>
              </VStack>
            </HStack>
            <DropdownOpt
              isOpen={openDropdownId === chat.id}
              onClose={() => setOpenDropdownId(null)}
              linePosition={4}
              menuOptions={menuOptions}
            />
          </Box>
        );
      })}
    </VStack>
  );
}