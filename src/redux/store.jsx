import { configureStore } from '@reduxjs/toolkit';
import task from './slices/TaskSlice';
import column from './slices/ColumnSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  return result;
};

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    task,
    column,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: persistedState,
});
export default store;
