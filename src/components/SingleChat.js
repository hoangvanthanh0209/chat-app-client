import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, IconButton, Spinner, Text, Input } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import io from 'socket.io-client'
import ReactLoading from 'react-loading'

import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import ScrollableChat from './ScrollableChat'
import { fetchAgainChat, setChat } from '../redux/chatSlice'
import { authSelector, chatSelector, notificationSelector } from '../redux/selector'
import { getSender, getSenderFull } from '../utils/chatLogics'
import messageService from '../services/messageService'
import { fetchAgainMess, resetFetchAgainMess } from '../redux/messageSlice'
import { addNotification } from '../redux/notificationSlice'

// const ENDPOINT = 'http://localhost:5001' // "https://talk-a-tive.herokuapp.com"; -> After deployment
// const ENDPOINT = 'https://chat-app-hvt.herokuapp.com' // "https://talk-a-tive.herokuapp.com"; -> After deployment
const ENDPOINT = 'https://chat-app-server-thv.up.railway.app' // "https://talk-a-tive.herokuapp.com"; -> After deployment

let socket, selectedChatCompare

function SingleChat() {
    const { chat } = useSelector(chatSelector)
    const { user } = useSelector(authSelector)
    const { notification } = useSelector(notificationSelector)

    const [loading, setLoading] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState([])
    const [socketConnected, setSocketConnected] = useState(false)

    const dispatch = useDispatch()

    const fetchMessage = async () => {
        if (Object.keys(chat).length) {
            const data = await messageService.getAllMessages(chat._id, user.token)
            setMessages(data)
            socket.emit('join chat', chat._id)
        }
    }

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            socket.emit('stop typing', chat._id)
            const chatData = {
                chatId: chat._id,
                content: newMessage,
            }

            const data = await messageService.sendMessage(chatData, user.token)

            if (data) {
                setNewMessage('')
                setMessages((prevMess) => [...prevMess, data])
                dispatch(fetchAgainChat())
                socket.emit('new message', data)
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        if (!socketConnected) return

        if (!typing) {
            setTyping(true)
            socket.emit('typing', chat._id)
        }
        let lastTypingTime = new Date().getTime()
        var timerLength = 3000
        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDiff = timeNow - lastTypingTime
            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', chat._id)
                setTyping(false)
            }
        }, timerLength)
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', user)
        socket.on('connected', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchMessage()
        selectedChatCompare = chat
    }, [chat])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare?._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    dispatch(addNotification(newMessageRecieved))
                    // dispatch(fetchAgainChat())
                }
            } else {
                console.log('ko o')
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

    return (
        <>
            {Object.keys(chat).length ? (
                <>
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
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} isSCroll={isTyping} />
                            </div>
                        )}

                        <FormControl onKeyDown={sendMessage} id="first-name" isRequired mt={3}>
                            {isTyping ? <ReactLoading type="bubbles" color="#000" height="50px" width="50px" /> : <></>}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Box>
                </>
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
