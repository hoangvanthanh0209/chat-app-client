import axios from 'axios'

const API = 'http://localhost:5001/api/user/'

const login = async (userData) => {
    const res = await axios.post(API + 'login', userData)

    return res.data
}

const register = async (userData) => {
    const res = await axios.post(API + 'register', userData)

    return res.data
}

const authService = { login, register }

export default authService
