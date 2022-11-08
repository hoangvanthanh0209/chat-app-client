import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import MyChats from '../components/MyChats'
import { authSelector } from '../redux/selector'

function ChatPage() {
    const { user } = useSelector(authSelector)

    return (
        <Box bg="blackAlpha.100" minHeight="100vh">
            {user && <Header />}
            <Box display="flex" height="93.5vh">
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </Box>
    )
}

export default ChatPage
