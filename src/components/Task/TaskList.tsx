/**
 * TaskList component that displays the list of tasks, divided into completed and incomplete tasks.
 * @param tasks Array of tasks to display.
 * @param setMessage Function that sets the message to be displayed.
 * @param setMessageType Function that sets the type of message to be displayed.
 * @param setMessageKey Function that sets the key for the message to be displayed.
 * @param handleSeeSubtasks Function that handles the display of subtasks when the "See subtasks" button is clicked.
 */

import React from 'react';
import { Task } from '../../types/types';
import { MessageType } from "../Message/Message";
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  setMessage: (message: string) => void;
  setMessageType: (messageType: MessageType) => void;
  setMessageKey: (key: number) => void;
  handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setMessage,
  setMessageType,
  setMessageKey,
  handleSeeSubtasks
}) => {
  // Filters the tasks into incomplete and completed tasks
  const incompleteTasks = tasks.filter((task: Task) => !task.status);
  const completedTasks = tasks.filter((task: Task) => task.status);

  return (
    <>
      <div className="tasks-container">
        <h2>Incomplete Tasks</h2>
        <div className="row todos">
          {/* Displays incomplete tasks */}
          {incompleteTasks.map((task: Task) => (
            <div className="col-12" key={task.id}>
              <TaskCard
                task={task}
                setMessage={setMessage}
                setMessageType={setMessageType}
                setMessageKey={setMessageKey}
                handleSeeSubtasks={(subtasks) => handleSeeSubtasks(subtasks, task)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="tasks-container">
        <h2>Completed Tasks</h2>
        <div className="row todos">
          {/* Displays completed tasks */}
          {completedTasks.map((task: Task) => (
            <div className="col-12" key={task.id}>
              <TaskCard
                task={task}
                setMessage={setMessage}
                setMessageType={setMessageType}
                setMessageKey={setMessageKey}
                handleSeeSubtasks={handleSeeSubtasks}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
