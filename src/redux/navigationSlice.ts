
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/types';

/**
 * Defines the shape of the NavigationState slice of the Redux store.
 */
interface NavigationState {
  navStack: { parent: Task; tasks: Task[] }[];
  currentParent: Task | null;
  currentTasks: Task[];
}

/**
 * The initial state of the NavigationState slice of the Redux store.
 */
const initialState: NavigationState = {
  navStack: [],
  currentParent: null,
  currentTasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

/**
* The navigationSlice slice of the Redux store.
*/
const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    /**
     * Sets the navigation stack in the Redux store.
     *
     * @param state The current state of the NavigationState slice.
     * @param action The payload action that contains the new navigation stack.
     */
    setNavStack(state, action: PayloadAction<{ parent: Task; tasks: Task[] }[]>) {
      state.navStack = action.payload;
      if (state.navStack.length === 0) {
        state.currentParent = null;
        state.currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      } else {
        state.currentParent = state.navStack[state.navStack.length - 1].parent;
        state.currentTasks = state.navStack[state.navStack.length - 1].tasks;
      }
    },
  },
});

export const { setNavStack } = navigationSlice.actions;
export default navigationSlice.reducer;
