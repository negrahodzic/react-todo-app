/**
* Redux store configuration with the following reducers:
* The store is also subscribed to changes and stores the tasks state in localStorage.
* @return The configured Redux store.
*/
import { configureStore, Store } from '@reduxjs/toolkit';
import taskReducer from './reducers';
import { addTask, updateTask, addSubtask, deleteTask } from './actions';
import navigationReducer from './navigationSlice';

const rootReducer = {
    tasks: taskReducer,
    navigation: navigationReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

store.subscribe(() => {
    localStorage.setItem('tasks', JSON.stringify(store.getState().tasks.tasks));
});

export type RootState = ReturnType<Store['getState']>;
export { addTask, updateTask, addSubtask, deleteTask };
export default store;
