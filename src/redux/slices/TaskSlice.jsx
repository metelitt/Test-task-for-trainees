import { createSlice } from '@reduxjs/toolkit';

const initialTasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    addTask(state, action) {
      const newTask = action.payload;
      state.tasks[newTask.id] = newTask;
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      delete state.tasks[taskId];
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
