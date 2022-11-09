import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    useDisclosure,
    Button,
    IconButton,
    FormControl,
    Input,
    Spinner,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToGroup, fetchAgainChat, removeFromGroup, renameGroup, resetChat } from '../redux/chatSlice'
import { authSelector, chatSelector } from '../redux/selector'
import authService from '../services/authService'
import UserBadgeItem from './UserBadgeItem'
import UserListItem from './UserListItem'

function UpdateGroupChatModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { chat, isLoadingChat, isErrorChat, isSuccessChat, messageChat } = useSelector(chatSelector)
    const { user } = useSelector(authSelector)

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [groupChatName, setGroupChatName] = useState('')

    const toast = useToast()
    const dispatch = useDispatch()

    const handleSearch = async (searchValue) => {
        setLoading(true)

        try {
            const data = await authService.getAllUsers(searchValue, user.token)
            setUsers(data)
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: 'Failed to Load the Search Results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }

        setLoading(false)
    }

    const handleRename = () => {
        if (!groupChatName) {
            toast({
                title: 'Error Occured!',
                description: 'Chat Name is empty',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }
        const chatData = {
            chatId: chat._id,
            chatName: groupChatName,
        }
        dispatch(renameGroup(chatData))
        dispatch(fetchAgainChat())
    }

    const handleAddUser = (user) => {
        const chatData = {
            chatId: chat._id,
            userId: user._id,
            isAdminRole: true,
        }
        dispatch(addToGroup(chatData))
        dispatch(fetchAgainChat())
    }

    const handleRemoveUser = (user) => {
        const chatData = {
            chatId: chat._id,
            userId: user._id,
            isAdminRole: true,
        }
        dispatch(removeFromGroup(chatData))
        dispatch(fetchAgainChat())
    }

    const handleLeave = (user) => {
        const chatData = {
            chatId: chat._id,
            userId: user._id,
        }
        dispatch(removeFromGroup(chatData))
        dispatch(fetchAgainChat())
        onClose()
    }

    useEffect(() => {
        isErrorChat &&
            toast({
                title: 'Error Occured!',
                description: messageChat,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        dispatch(resetChat())
    }, [isErrorChat, messageChat])

    return (
        <>
            <IconButton icon={<FaEye />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="32px" display="flex" justifyContent="center">
                        {chat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {chat.users.map((u) => (
                            <UserBadgeItem
                                key={u._id}
                                user={u}
                                handleFunction={() => {
                                    handleRemoveUser(u)
                                }}
                            />
                        ))}
                        <FormControl display="flex" my={3}>
                            <Input
                                placeholder="Chat name"
                                onChange={(e) => {
                                    setGroupChatName(e.target.value)
                                }}
                            />
                            <Button colorScheme="blue" ml={2} isLoading={isLoadingChat} onClick={handleRename}>
                                Update
                            </Button>
                        </FormControl>
                        <FormControl mb={3}>
                            <Input
                                placeholder="Add users to group"
                                onChange={(e) => {
                                    handleSearch(e.target.value)
                                }}
                            />
                        </FormControl>
                        <Box>
                            {loading ? (
                                <Box display="flex">
                                    <Spinner size="xs" width={10} height={10} alignSelf="center" margin="auto" />
                                </Box>
                            ) : (
                                <Stack overflowY="hidden">
                                    <Box overflowY="scroll" maxHeight="500px">
                                        {users.map((u) => (
                                            <UserListItem
                                                key={u._id}
                                                user={u}
                                                handleFunction={() => {
                                                    handleAddUser(u)
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Stack>
                            )}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            isLoading={isLoadingChat}
                            onClick={() => {
                                handleLeave(user)
                            }}
                        >
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal
