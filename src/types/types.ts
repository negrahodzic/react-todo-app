export interface Task {
    id: number;
    taskName: string;
    status: boolean;
    subtasks: Task[];
}
