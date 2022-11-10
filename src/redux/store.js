import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authSlice from './authSlice'
import chatSlice from './chatSlice'
import messageSlice from './messageSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

const reducer = combineReducers({
    auth: authSlice,
    chat: chatSlice,
    message: messageSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)

export default store
