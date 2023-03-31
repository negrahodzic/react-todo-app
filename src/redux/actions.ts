import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/types';

export const addTask = createAction<Task>('tasks/addTask');
export const updateTask = createAction<Task>('tasks/updateTask');
export const addSubtask = createAction<{ parentId: number; subtask: Task }>('tasks/addSubtask');
export const deleteTask = createAction<number>('tasks/deleteTask');
export const setNavStack = createAction<{ navStack: { parent: Task | null; tasks: Task[] }[]; parentTask: Task | null; tasks: Task[] }>('navigation/setNavStack');
