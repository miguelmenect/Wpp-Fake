// App.tsx
import './App.css'
import { Box } from '@chakra-ui/react'
import ChatContainer from './components/Chats Container/ChatContainer'
import ContactsChat from './components/Contacts Chat Area/ContactsChat'
import SideBar from './components/Header/SideBar'

function App() {
  return (
    <Box display="flex" h="100vh" w="100vw">
      <SideBar />
      <ChatContainer />
      {<ContactsChat />}
    </Box>
  )
}

export default App