import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { FaSearch, FaChevronDown, FaBell } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, notificationSelector } from '../redux/selector'
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItem'
import authService from '../services/authService'
import chatService from '../services/chatService'
import { fetchAgainChat, setChat } from '../redux/chatSlice'
import ProfileModal from './ProfileModal'
import { logout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { addNotification } from '../redux/notificationSlice'
import { getSender } from '../utils/chatLogics'

function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const [searchResult, setSearchResult] = useState([])

    const { user } = useSelector(authSelector)
    const { notification } = useSelector(notificationSelector)

    const btnRef = useRef()
    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = async () => {
        setLoading(true)

        try {
            const data = await authService.getAllUsers(search, user.token)
            setSearchResult(data)
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

    const accessChat = async (userId) => {
        setLoadingChat(true)
        try {
            const data = await chatService.accessChat(userId, user.token)
            dispatch(setChat(data))
            dispatch(fetchAgainChat())
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            })
        }
        setLoadingChat(false)
        onClose()
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                background="white"
                width="100%"
                padding="5px 10px 5px 10px"
                borderWidth="5px"
                borderRadius="8px"
            >
                <Tooltip label="Search User To Chat" hasArrow>
                    <Button ref={btnRef} variant="ghost" leftIcon={<FaSearch />} onClick={onOpen}>
                        Search User
                    </Button>
                </Tooltip>
                <Text fontSize="2xl">Chat App</Text>
                <Box display="flex" gap="10px">
                    <Menu>
                        <MenuButton as={Button} background="white">
                            <FaBell style={{ fontSize: '20px' }} color={notification.length ? 'red' : ''} />
                        </MenuButton>
                        <MenuList pl="2">
                            {!notification.length && 'No New Messages'}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        // dispatch(addNotification(notification.filter((n) => n !== notif)))
                                        dispatch(setChat(notif.chat))
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown />} background="white">
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.avatar} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

                    <DrawerBody>
                        <Box display="flex" mb="10px">
                            <Input
                                placeholder="Search by name or email"
                                marginRight={2}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loadingChat ? (
                            <Box display="flex">
                                <Spinner size="xs" width={10} height={10} alignSelf="center" margin="auto" />
                            </Box>
                        ) : loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => {
                                        accessChat(user._id)
                                    }}
                                />
                            ))
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
