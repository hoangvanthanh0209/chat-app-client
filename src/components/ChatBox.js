import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { chatSelector } from '../redux/selector'
import SingleChat from './SingleChat'

function ChatBox() {
    const { chat } = useSelector(chatSelector)

    return (
        <Box
            display={{ base: Object.keys(chat).length ? 'flex' : 'none', md: 'flex' }}
            flexDir="column"
            alignItems="center"
            bg="white"
            width={{ base: '100%', md: '69%' }}
            padding="5px"
            borderWidth="5px"
            borderRadius="8px"
        >
            <SingleChat />
        </Box>
    )
}

export default ChatBox
