import axios from 'axios'

// const API = 'http://localhost:5001/api/user/'
// const API = 'https://chat-app-hvt.herokuapp.com/api/user/'
const API = 'https://chat-app-server-thv.up.railway.app/api/user/'

const login = async (userData) => {
    const res = await axios.post(API + 'login', userData)

    return res.data
}

const register = async (userData) => {
    const res = await axios.post(API + 'register', userData)

    return res.data
}

const getAllUsers = async (keyword, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            search: keyword,
        },
    }

    const res = await axios.get(API, config)

    return res.data
}

const authService = { login, register, getAllUsers }

export default authService
