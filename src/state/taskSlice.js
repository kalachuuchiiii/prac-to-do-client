import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {
  tasks: [], 
  totalTasks: 0,
  pinnedTasks: []
}

const taskSlice = createSlice({
  name: "task", 
  initialState, 
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    }, 
    setPinnedTasks: (state, action) => {
      state.pinnedTasks = action.payload.pinnedTasks
    }
  },
})

export default taskSlice.reducer;
export const { setTasks, setPinnedTasks } = taskSlice.actions;

