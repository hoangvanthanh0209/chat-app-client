import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Input,
    FormControl,
    useToast,
    Spinner,
    Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/selector'
import authService from '../services/authService'
import UserListItem from './UserListItem'
import UserBadgeItem from './UserBadgeItem'
import chatService from '../services/chatService'
import { fetchAgainChat } from '../redux/chatSlice'

function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName, setGroupChatNam] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])

    const { user } = useSelector(authSelector)

    const dispatch = useDispatch()

    const toast = useToast()

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

    const handleGroupUser = (userAdd) => {
        if (selectedUsers.includes(userAdd)) {
            toast({
                title: 'User already added',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
            return
        }

        setSelectedUsers((prevUsers) => {
            return [...prevUsers, userAdd]
        })
    }

    const handleRemoveGroupUser = (user) => {
        setSelectedUsers((prevUsers) => {
            return prevUsers.filter((u) => u._id !== user._id)
        })
    }

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'Please fill all the feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
            return
        }

        try {
            const groupChatData = {
                chatName: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            }
            const data = await chatService.createGroupChat(groupChatData, user.token)

            if (data) {
                dispatch(fetchAgainChat())
                setSelectedUsers([])
                setUsers([])
                onClose()
            }
        } catch (error) {
            toast({
                title: 'Failed to Create the Chat!',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        }
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="32px" display="flex" justifyContent="center">
                        Create group chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input
                                placeholder="Chat name"
                                mb={3}
                                onChange={(e) => {
                                    setGroupChatNam(e.target.value)
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Name"
                                mb={3}
                                onChange={(e) => {
                                    handleSearch(e.target.value)
                                }}
                            />
                        </FormControl>
                        <Box>
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => {
                                        handleRemoveGroupUser(u)
                                    }}
                                />
                            ))}
                        </Box>
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
                                                    handleGroupUser(u)
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Stack>
                            )}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
