// import { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Avatar, Box, Stack, Tooltip } from '@chakra-ui/react'

// import { resetFetchAgainMess } from '../redux/messageSlice'
import { authSelector } from '../redux/selector'
// import { authSelector, chatSelector, messageSelector } from '../redux/selector'
// import messageService from '../services/messageService'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../utils/chatLogics'
import { useEffect, useRef } from 'react'

function ScrollableChat({ messages, isSCroll }) {
    // const [messages, setMessages] = useState([])
    const { user } = useSelector(authSelector)
    // const { chat } = useSelector(chatSelector)
    // const { isFetchAgainMess } = useSelector(messageSelector)

    // const dispatch = useDispatch()

    // const fetchMessage = async () => {
    //     const data = await messageService.getAllMessages(chat._id, user.token)
    //     setMessages(data)
    // }

    // useEffect(() => {
    //     fetchMessage()
    // }, [chat])

    // useEffect(() => {
    //     isFetchAgainMess && fetchMessage() && dispatch(resetFetchAgainMess())
    // }, [isFetchAgainMess])

    const messagesEndRef = useRef()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        isSCroll && scrollToBottom()
    }, [isSCroll])

    return (
        <Stack overflowY="hidden">
            <Box overflowY="scroll" maxHeight="100%">
                {messages.map((m, i) => (
                    <div style={{ display: 'flex' }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    src={m.sender.avatar}
                                />
                            </Tooltip>
                        )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: '20px',
                                padding: '5px 15px',
                                maxWidth: '75%',
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </Box>
        </Stack>
    )
}

export default ScrollableChat
