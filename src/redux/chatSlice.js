import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import chatService from '../services/chatService'

const initialState = {
    chat: {},
    isLoadingChat: false,
    isSuccessChat: false,
    isErrorChat: false,
    isFetchAgainChat: false,
    messageChat: '',
}

export const renameGroup = createAsyncThunk('chat/rename', async (groupChat, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.renameGroup(groupChat, token)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addToGroup = createAsyncThunk('chat/groupadd', async (groupChat, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.addToGroup(groupChat, token)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const removeFromGroup = createAsyncThunk('chat/groupremove', async (groupChat, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.removeFromGroup(groupChat, token)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

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
    extraReducers: (builder) => {
        builder
            .addCase(renameGroup.pending, (state) => {
                state.isLoadingChat = true
            })
            .addCase(renameGroup.fulfilled, (state, action) => {
                state.isLoadingChat = false
                state.isSuccessChat = true
                state.chat = action.payload
            })
            .addCase(renameGroup.rejected, (state, action) => {
                state.isLoadingChat = false
                state.isErrorChat = true
                state.messageChat = action.payload
            })

            .addCase(addToGroup.pending, (state) => {
                state.isLoadingChat = true
            })
            .addCase(addToGroup.fulfilled, (state, action) => {
                state.isLoadingChat = false
                state.isSuccessChat = true
                state.chat = action.payload
            })
            .addCase(addToGroup.rejected, (state, action) => {
                state.isLoadingChat = false
                state.isErrorChat = true
                state.messageChat = action.payload
            })

            .addCase(removeFromGroup.pending, (state) => {
                state.isLoadingChat = true
            })
            .addCase(removeFromGroup.fulfilled, (state, action) => {
                state.isLoadingChat = false
                state.isSuccessChat = true
                state.chat = action.payload
            })
            .addCase(removeFromGroup.rejected, (state, action) => {
                state.isLoadingChat = false
                state.isErrorChat = true
                state.messageChat = action.payload
            })
    },
})

export const { resetChat, fetchAgainChat, resetFetchAgainChat, setChat } = chatSlice.actions

export default chatSlice.reducer
