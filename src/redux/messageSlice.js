import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoadingMess: false,
    isSuccessMess: false,
    isErrorMess: false,
    isFetchAgainMess: false,
    messageMess: '',
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        fetchAgainMess: (state) => {
            state.isFetchAgainMess = true
        },
        resetFetchAgainMess: (state) => {
            state.isFetchAgainMess = false
        },
    },
    extraReducers: () => {},
})

export const { fetchAgainMess, resetFetchAgainMess } = messageSlice.actions

export default messageSlice.reducer
