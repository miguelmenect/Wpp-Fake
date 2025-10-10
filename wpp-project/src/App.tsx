// App.tsx
import './App.css'
import { Box, ChakraProvider } from '@chakra-ui/react'
import ChatContainer from './components/Chats Container/ChatContainer'
import ContactsChat from './components/Contacts Chat Area/ContactsChat'
import SideBar from './components/Header/SideBar'
import { ChatProvider } from './context/ChatContext'

function App() {
  return (
    <ChakraProvider>
      <ChatProvider>
        <Box display="flex" h="100vh" w="100vw" overflow="hidden">
          <Box w="64px" flexShrink={0} /> {/* Espaçador para a sidebar fixa */}
          <SideBar />
          <ChatContainer />
          <ContactsChat />
        </Box >
      </ChatProvider>
    </ChakraProvider>

  )
}

export default App