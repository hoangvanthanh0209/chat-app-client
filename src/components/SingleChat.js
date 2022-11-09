import { Box, IconButton, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, chatSelector } from '../redux/selector'
import ProfileModal from '../components/ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { getSender, getSenderFull } from '../utils/chatLogics'
import { FaArrowLeft } from 'react-icons/fa'
import { setChat } from '../redux/chatSlice'

function SingleChat() {
    const { chat = {} } = useSelector(chatSelector)
    const { user } = useSelector(authSelector)

    const dispatch = useDispatch()

    return (
        <>
            {Object.keys(chat).length ? (
                <Box
                    fontSize={{ base: '28px', md: '30px' }}
                    pb={3}
                    px={2}
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent={{ base: 'space-between' }}
                    alignItems="center"
                    width="100%"
                >
                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        icon={<FaArrowLeft />}
                        onClick={() => dispatch(setChat({}))}
                    />
                    <Text>{chat?.isGroupChat ? chat?.chatName : chat && getSender(user, chat?.users)}</Text>
                    {chat?.isGroupChat ? (
                        <UpdateGroupChatModal></UpdateGroupChatModal>
                    ) : (
                        <ProfileModal user={chat && getSenderFull(user, chat?.users)}></ProfileModal>
                    )}
                </Box>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat
