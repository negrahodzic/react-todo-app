/**
 * TaskList component that displays the list of tasks, divided into completed and incomplete tasks.
 * @param tasks Array of tasks to display.
 * @param setMessage Function that sets the message to be displayed.
 * @param setMessageType Function that sets the type of message to be displayed.
 * @param setMessageKey Function that sets the key for the message to be displayed.
 * @param handleSeeSubtasks Function that handles the display of subtasks when the "See subtasks" button is clicked.
 */

import { Task } from '../../types/types';
import { MessageType } from "../Message/Message";
import TaskCard from '../TaskCard/TaskCard';

import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  setMessage: (message: string) => void;
  setMessageType: (messageType: MessageType) => void;
  setMessageKey: (key: number) => void;
  handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
}
function TaskList(props: TaskListProps) {
  // Filters the tasks into incomplete and completed tasks
  const incompleteTasks = props.tasks.filter((task: Task) => !task.status);
  const completedTasks = props.tasks.filter((task: Task) => task.status);

  return (
    <>
      <div className={styles.incompleteTasksContainer}>
        <h2>Incomplete Tasks</h2>
        <div className={`${styles.row} ${styles.todos}`}>
          {/* Displays incomplete tasks */}
          {incompleteTasks.map((task: Task) => (
            <div className={styles.col_12} key={task.id}>
              <TaskCard
                task={task}
                setMessage={props.setMessage}
                setMessageType={props.setMessageType}
                setMessageKey={props.setMessageKey}
                handleSeeSubtasks={(subtasks) => props.handleSeeSubtasks(subtasks, task)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.completedTasksContainer}>
        <h2>Completed Tasks</h2>
        <div className={`${styles.row} ${styles.todos}`}>
          {/* Displays completed tasks */}
          {completedTasks.map((task: Task) => (
            <div className={styles.col_12} key={task.id}>
              <TaskCard
                task={task}
                setMessage={props.setMessage}
                setMessageType={props.setMessageType}
                setMessageKey={props.setMessageKey}
                handleSeeSubtasks={props.handleSeeSubtasks}
              />
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default TaskList;
