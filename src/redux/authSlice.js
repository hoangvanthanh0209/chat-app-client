import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

const initialState = {
    user: null,
    isLoadingAuth: false,
    isSuccessAuth: false,
    isErrorAuth: false,
    messageAuth: '',
}

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoadingAuth = false
            state.isSuccessAuth = false
            state.isErrorAuth = false
            state.messageAuth = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.messageAuth = action.payload
            })

            .addCase(register.pending, (state) => {
                state.isLoadingAuth = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoadingAuth = false
                state.isSuccessAuth = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoadingAuth = false
                state.isErrorAuth = true
                state.messageAuth = action.payload
            })
    },
})

export const { resetAuth } = authSlice.actions

export default authSlice.reducer
