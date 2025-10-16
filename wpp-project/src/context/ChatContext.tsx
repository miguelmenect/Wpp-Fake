import { createContext, useContext, useState, type ReactNode } from "react";
import type { Chat, Message } from "../utils/chatsData";

interface ChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
  readChats: Set<string>;
  markChatAsRead: (chatId: string) => void;
  countUnreadMessages: (messages: Message[]) => number;
  hasUnreadMessages: (chat: Chat) => boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [readChats, setReadChats] = useState<Set<string>>(new Set());

  // Marca um chat como lido
  const markChatAsRead = (chatId: string) => {
    setReadChats((prev) => {
      const newSet = new Set(prev);
      newSet.add(chatId);
      return newSet;
    });
  };

  // Conta quantas mensagens não lidas consecutivas existem no final da conversa
  const countUnreadMessages = (messages: Message[]): number => {
    let count = 0;
    // Percorre de trás para frente até encontrar uma mensagem do usuário
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === "contact") {
        count++;
      } else {
        break; // Para quando encontrar uma mensagem do usuário
      }
    }
    return count;
  };

  // Verifica se um chat tem mensagens não lidas
  const hasUnreadMessages = (chat: Chat): boolean => {
    const unreadCount = countUnreadMessages(chat.messages);
    return unreadCount > 0 && !readChats.has(chat.id);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        readChats,
        markChatAsRead,
        countUnreadMessages,
        hasUnreadMessages,
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