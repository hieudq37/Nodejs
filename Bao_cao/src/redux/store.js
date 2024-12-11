import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'; 
import userReducer from './slides/userSlide';// Đây là cách import đúng cho default export


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})