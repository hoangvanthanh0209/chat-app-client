import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormControl, IconButton, Spinner, Text, Input } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'

import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import ScrollableChat from './ScrollableChat'
import { setChat } from '../redux/chatSlice'
import { authSelector, chatSelector } from '../redux/selector'
import { getSender, getSenderFull } from '../utils/chatLogics'

function SingleChat() {
    const { chat = {} } = useSelector(chatSelector)
    const { user } = useSelector(authSelector)

    const [loading, setLoading] = useState(false)
    const [istyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState([])

    const dispatch = useDispatch()

    const sendMessage = () => {}

    const typingHandler = () => {}

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
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl onKeyDown={sendMessage} id="first-name" isRequired mt={3}>
                            {istyping ? (
                                <div>
                                    {/* <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    /> */}
                                    typing
                                </div>
                            ) : (
                                <></>
                            )}
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
