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
    updateTaskContent: (state, action) => {
      const { taskId, newContent } = action.payload;
      const taskToUpdate = state.tasks[taskId];
      if (taskToUpdate) {
        taskToUpdate.content = newContent;
      }
    }
  },
});

export const { addTask,deleteTask,updateTaskContent } = tasksSlice.actions;
export default tasksSlice.reducer;