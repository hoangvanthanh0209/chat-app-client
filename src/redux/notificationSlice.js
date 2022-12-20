import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification: [],
}

const notificationSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notification.push(action.payload)
        },
    },
    extraReducers: () => {},
})

export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer
