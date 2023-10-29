import { createSlice } from '@reduxjs/toolkit';

const initialColumnsState = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Planned',
      taskIds: [],
      color: '#ff4244',
    },
    'column-2': {
      id: 'column-2',
      title: 'In Working',
      taskIds: [],
      color: '#b4a6ff',
    },
    'column-3': {
      id: 'column-3',
      title: 'Testing',
      taskIds: [],
      color: '#41ffbb',
    },
    'column-4': {
      id: 'column-4',
      title: 'Release',
      taskIds: [],
      color: '#f5df8b',
    },
  },
  tasks: {},
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initialColumnsState,
  reducers: {
    deleteTaskFromColumn(state, action) {
      const { columnId, taskId } = action.payload;
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
        (id) => id !== taskId,
      );
      delete state.tasks[taskId];
    },
    addTaskToColumn(state, action) {
      const { columnId, task } = action.payload;
      state.columns[columnId].taskIds.push(task.id);
      state.tasks[task.id] = task;
    },
    reorderColumnTasks(state, action) {
      const { source, destination } = action.payload;
      if (!source || !source.droppableId) {
        console.error('Некорректное значение source или source.droppableId');
        return;
      }
      if (!destination || !destination.droppableId) {
        console.error(
          'Некорректное значение destination или destination.droppableId',
        );
        return;
      }
      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];
      if (!start || !finish) {
        console.error('Столбец не найден. Проверьте значения droppableId');
        return;
      }
      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, start.taskIds[source.index]);
        start.taskIds = newTaskIds;
      } else {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, start.taskIds[source.index]);
        start.taskIds = startTaskIds;
        finish.taskIds = finishTaskIds;
      }
    },
  },
});
export const { addTaskToColumn, deleteTaskFromColumn, reorderColumnTasks } =
  columnsSlice.actions;
export default columnsSlice.reducer;
