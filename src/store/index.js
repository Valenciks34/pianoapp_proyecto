import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import counterReducer from './slices/counterSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  },
})