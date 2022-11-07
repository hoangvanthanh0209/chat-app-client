import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authSlice from './authSlice'
import chatSlice from './chatSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'chat'],
}

const reducer = combineReducers({
    auth: authSlice,
    chat: chatSlice,
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
