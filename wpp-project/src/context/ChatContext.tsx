import { createContext, useContext, useState, type ReactNode } from "react";
import type { Chat, Message } from "../utils/chatsData";
import { chatsData } from "../utils/chatsData";

interface ChatContextType {
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
  readChats: Set<string>;
  markChatAsRead: (chatId: string) => void;
  countUnreadMessages: (messages: Message[]) => number;
  hasUnreadMessages: (chat: Chat) => boolean;
  updateChatMessages: (chatId: string, newMessage: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(chatsData);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [readChats, setReadChats] = useState<Set<string>>(new Set());

  // marca um chat como lido
  const markChatAsRead = (chatId: string) => {
    setReadChats((prev) => {
      const newSet = new Set(prev);
      newSet.add(chatId);
      return newSet;
    });
  };

  // conta quantas mensagens não lidas consecutivas existem no final da conversa
  const countUnreadMessages = (messages: Message[]): number => {
    let count = 0;
    // Percorre de trás para frente até encontrar uma mensagem do usuário
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === "contact") {
        count++;
      } else {
        break; // para quando encontrar uma mensagem do usuário
      }
    }
    return count;
  };

  // verifica se um chat tem mensagens não lidas
  const hasUnreadMessages = (chat: Chat): boolean => {
    const unreadCount = countUnreadMessages(chat.messages);
    return unreadCount > 0 && !readChats.has(chat.id);
  };

  // adiciona uma nova mensagem ao chat específico
  const updateChatMessages = (chatId: string, newMessage: Message) => { //recebe id do chat selecionado
    setChats((prevChats) => //atualizando o estado global de chats (todas as conversas)
      prevChats.map((chat) =>
        // verifica se o ID do chat atual é o mesmo que o ID do chat selecionado
        chat.id === chatId
          //se for o chat certo, cria um novo array de mensagens e adiciona a nova mensagem no final da lista
          ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: {
              text: newMessage.text,
              timestamp: newMessage.timestamp,
              sender: newMessage.sender,
            },
          }
          : chat //se não retorna o chat sem nenhuma alteração
      )
    );

    // a]tualiza o selectedChat também se for o chat ativo
    if (selectedChat?.id === chatId) {
      setSelectedChat((prev) =>
        prev ? {
          ...prev,
          messages: [...prev.messages, newMessage],
          lastMessage: {
            text: newMessage.text,
            timestamp: newMessage.timestamp,
            sender: newMessage.sender,
          },
        } : null
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        selectedChat,
        setSelectedChat,
        readChats,
        markChatAsRead,
        countUnreadMessages,
        hasUnreadMessages,
        updateChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat deve ser usado dentro de um ChatProvider");
  }
  return context;
}