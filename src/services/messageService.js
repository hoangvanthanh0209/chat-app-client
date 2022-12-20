import axios from 'axios'

// const API = 'http://localhost:5001/api/message/'
// const API = 'https://chat-app-hvt.herokuapp.com/api/message/'
const API = 'https://chat-app-server-thv.up.railway.app/api/message/'

const getAllMessages = async (chatId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.get(API + chatId, config)

    return res.data
}

const sendMessage = async (messageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.post(API, messageData, config)

    return res.data
}

const messageService = { getAllMessages, sendMessage }

export default messageService
