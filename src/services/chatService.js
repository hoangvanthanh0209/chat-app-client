import axios from 'axios'

// const API = 'http://localhost:5001/api/chat/'
// const API = 'https://chat-app-hvt.herokuapp.com/api/chat/'
const API = 'https://chat-app-server-thv.up.railway.app/api/chat/'

const accessChat = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.post(API, { userId }, config)

    return res.data
}

const fetchChats = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.get(API, config)

    return res.data
}

const createGroupChat = async (groupChatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.post(API + 'group', groupChatData, config)

    return res.data
}

const renameGroup = async (groupChatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.put(API + 'rename', groupChatData, config)

    return res.data
}

const addToGroup = async (groupChatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.put(API + 'groupadd', groupChatData, config)

    return res.data
}

const removeFromGroup = async (groupChatData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.put(API + 'groupremove', groupChatData, config)

    return res.data
}

const chatService = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }

export default chatService
