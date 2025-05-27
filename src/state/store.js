import taskReducer from './taskSlice.js';
import { configureStore } from '@reduxjs/toolkit'; 


const store = configureStore({
  reducer: {
    tasks: taskReducer
  }
})

export default store;