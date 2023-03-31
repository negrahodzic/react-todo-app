import { Task } from '../types/types';

export function validateTaskName(taskName: string) {
    const maxTaskNameLength = 50;

    if (!taskName.trim()) {
        return { isValid: false, message: "Task name cannot be empty.", messageType: "error" };
    }

    if (taskName.trim().length > maxTaskNameLength) {
        return { isValid: false, message: "Task name is too long. Please use 50 characters or fewer.", messageType: "error" };
    }

    return { isValid: true };
}

export function checkDuplicateTasks(tasks: Task[], taskName: string): boolean {
    return tasks.some((task: Task) => task.taskName.toLowerCase() === taskName.toLowerCase());
}

export const getCorrectTasksList = (tasks: Task[], navStack: { parent: Task | null; tasks: Task[] }[]) => {
    if (navStack.length <= 1) {
        return tasks;
    }

    const parentTask = navStack[navStack.length - 1].parent;
    if (parentTask) {
        return parentTask.subtasks;
    }

    return tasks;
};

export const findTaskById = (tasks: Task[], id: number): Task | null => {
    for (const task of tasks) {
      if (task.id === id) {
        return task;
      }
  
      const foundSubtask = findTaskById(task.subtasks, id);
      if (foundSubtask) {
        return foundSubtask;
      }
    }
  
    return null;
  };
  
