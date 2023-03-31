import { Task } from '../types/types';

/**
* Finds a task with the given taskId in the provided tasks array or its subtasks recursively.
* @param tasks Array of tasks to search for the task with the given taskId.
* @param taskId Id of the task to search for.
* @returns Task object with the given taskId or null if no such task is found.
*/
export const findTaskById = (tasks: Task[], taskId: number): Task | null => {
    for (const task of tasks) {
        if (task.id === taskId) {
            return task;
        }

        const foundTask = findTaskById(task.subtasks, taskId);
        if (foundTask) {
            return foundTask;
        }
    }

    return null;
};

/**
* Recursively marks all subtasks of the provided task as complete.
* @param task Task object whose subtasks need to be marked complete.
*/

export const markAllSubtasksComplete = (task: Task) => {
    task.subtasks.forEach(subtask => {
        subtask.status = true;
        markAllSubtasksComplete(subtask);
    });
};

/**
* Checks if all subtasks in the provided array of tasks are completed.
* @param subtasks Array of tasks to check.
* @returns True if all subtasks are completed, false otherwise.
*/
export const areAllSubtasksCompleted = (subtasks: Task[]): boolean => {
    return subtasks.every((subtask) => subtask.status);
};

/**
* Finds the parent task of the task with the given taskId in the provided tasks array or its subtasks recursively.
* @param tasks Array of tasks to search for the parent task of the task with the given taskId.
* @param taskId Id of the task whose parent task needs to be found.
* @returns Task object that is the parent of the task with the given taskId or null if no such parent task is found.
*/
export const findParentTask = (tasks: Task[], taskId: number): Task | null => {
    for (const task of tasks) {
        if (task.subtasks.some((subtask) => subtask.id === taskId)) {
            return task;
        }

        const foundParent = findParentTask(task.subtasks, taskId);
        if (foundParent) {
            return foundParent;
        }
    }

    return null;
};
