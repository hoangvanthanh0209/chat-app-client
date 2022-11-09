import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, chatSelector } from '../redux/selector'
import chatService from '../services/chatService'
import GroupChatModal from './GroupChatModal'
import { getSender } from '../utils/chatLogics'
import { resetFetchAgainChat, setChat } from '../redux/chatSlice'

function MyChats() {
    const { chat, isFetchAgainChat } = useSelector(chatSelector)
    const { user } = useSelector(authSelector)
    const [chats, setChats] = useState([])

    const toast = useToast()
    const dispatch = useDispatch()

    const fetchChats = async () => {
        try {
            const data = await chatService.fetchChats(user.token)
            setChats(data)
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: 'Failed to Load the chats',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
    }

    useEffect(() => {
        fetchChats()
    }, [])

    useEffect(() => {
        isFetchAgainChat && fetchChats() && dispatch(resetFetchAgainChat())
    }, [isFetchAgainChat])

    return (
        <Box
            display={{ base: Object.keys(chat).length ? 'none' : 'flex', md: 'flex' }}
            flexDir="column"
            alignItems="center"
            bg="white"
            width={{ base: '100%', md: '31%' }}
            padding="5px"
            borderWidth="5px"
            borderRadius="8px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: '28px', md: '30px' }}
                fontFamily="Work sans"
                display="flex"
                width="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text>My chats</Text>
                <GroupChatModal>
                    <Button d="flex" fontSize={{ base: '17px', md: '10px', lg: '17px' }} rightIcon={<FaPlus />}>
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                width="100%"
                height="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                <Stack overflowY="scroll">
                    {chats?.map((chatItem) => (
                        <Box
                            onClick={() => {
                                dispatch(setChat(chatItem))
                            }}
                            cursor="pointer"
                            bg={chat?._id === chatItem._id ? '#38B2AC' : '#E8E8E8'}
                            color={chat?._id === chatItem._id ? 'white' : '#000'}
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={chatItem._id}
                            minHeight="58px"
                        >
                            <Text fontWeight={600}>
                                {chatItem.isGroupChat ? chatItem.chatName : getSender(user, chatItem.users)}
                            </Text>
                            {chatItem.latestMessage && (
                                <Text fontSize="xs">
                                    <b>{chatItem.latestMessage.sender.name} : </b>
                                    {chatItem.latestMessage.content.length > 50
                                        ? chatItem.latestMessage.content.substring(0, 51) + '...'
                                        : chatItem.latestMessage.content}
                                </Text>
                            )}
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}

export default MyChats
