import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    chat: {},
    isLoadingChat: false,
    isSuccessChat: false,
    isErrorChat: false,
    isFetchAgainChat: false,
    messageChat: '',
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        resetChat: (state) => {
            state.isLoadingChat = false
            state.isSuccessChat = false
            state.isErrorChat = false
            state.isFetchAgainChat = false
            state.messageChat = ''
        },
        fetchAgainChat: (state) => {
            state.isFetchAgainChat = true
        },
        resetFetchAgainChat: (state) => {
            state.isFetchAgainChat = false
        },
        setChat: (state, action) => {
            state.chat = action.payload
        },
    },
    extraReducers: (builder) => {},
})

export const { resetChat, fetchAgainChat, resetFetchAgainChat, setChat } = chatSlice.actions

export default chatSlice.reducer
