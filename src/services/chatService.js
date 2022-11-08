import axios from 'axios'

const API = 'http://localhost:5001/api/chat/'

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

const chatService = { accessChat, fetchChats }

export default chatService
