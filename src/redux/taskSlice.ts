import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/types';
import { findTaskById, findParentTask, markAllSubtasksComplete, areAllSubtasksCompleted } from './utils';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

/**
 * Redux slice that manages the tasks state.
 */
const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        /**
         * Adds a new task to the list of tasks.
         * @param {TaskState} state - The current state of the tasks slice.
         * @param {PayloadAction<Task>} action - The Redux action containing the new task to add.
         */
        addTask(state: TasksState, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        /**
         * Updates an existing task in the list of tasks.
         * @param {TaskState} state - The current state of the tasks slice.
         * @param {PayloadAction<Task>} action - The Redux action containing the updated task.
         */
        updateTask(state: TasksState, action: PayloadAction<Task>) {
            const taskToUpdate = findTaskById(state.tasks, action.payload.id);
            if (taskToUpdate) {
                taskToUpdate.status = action.payload.status;
                taskToUpdate.taskName = action.payload.taskName;
                if (action.payload.status) {
                    markAllSubtasksComplete(taskToUpdate);
                }
            }

            const parentTask = findParentTask(state.tasks, action.payload.id);
            if (parentTask) {
                if (areAllSubtasksCompleted(parentTask.subtasks)) {
                    parentTask.status = true;
                } else {
                    parentTask.status = false;
                }
            }
        },
        /**
         * Adds a new subtask to an existing task in the list of tasks.
         * @param {TaskState} state - The current state of the tasks slice.
         * @param {PayloadAction<{ parentId: number; subtask: Task }>} action - The Redux action containing the parent task ID and the new subtask to add.
         */
        addSubtask(state: TasksState, action: PayloadAction<{ parentId: number; subtask: Task }>) {
            const { parentId, subtask } = action.payload;
            const parentTask = findTaskById(state.tasks, parentId);
            if (parentTask) {
                parentTask.subtasks.push(subtask);
            }
        },
        /**
         * Deletes a task and all its subtasks from the list of tasks.
         * @param {TaskState} state - The current state of the tasks slice.
         * @param {PayloadAction<number>} action - The Redux action containing the ID of the task to delete.
         */
        deleteTask(state: TasksState, action: PayloadAction<number>) {
            const deleteTaskById = (tasks: Task[], taskId: number): Task[] => {
                return tasks.filter(task => {
                    if (task.id === taskId) {
                        return false;
                    }
                    task.subtasks = deleteTaskById(task.subtasks, taskId);
                    return true;
                });
            };

            state.tasks = deleteTaskById(state.tasks, action.payload);
        },
    },
});

export const { addTask, updateTask, addSubtask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
