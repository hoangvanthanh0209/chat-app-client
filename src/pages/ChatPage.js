import { Box, Container } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { authSelector } from '../redux/selector'

function ChatPage() {
    const { user } = useSelector(authSelector)

    return (
        <Box bg="blackAlpha.100" minHeight="100vh">
            {user && <Header />}
        </Box>
    )
}

export default ChatPage
