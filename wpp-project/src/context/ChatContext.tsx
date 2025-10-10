import { createContext, useContext, useState, type ReactNode, } from "react";
import type { Chat } from "../utils/chatsData";


interface ChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
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