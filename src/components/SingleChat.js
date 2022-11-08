import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { chatSelector } from '../redux/selector'

function SingleChat() {
    const { chat } = useSelector(chatSelector)

    return <Box>SingleChat</Box>
}

export default SingleChat
