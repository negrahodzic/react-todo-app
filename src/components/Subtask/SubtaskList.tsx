import React from 'react';
import { Task } from '../../types/types';
import { MessageType } from "../Message/Message";
import TaskCard from '../Task/TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


interface SubtaskListProps {
  subtasks: Task[];
  parentTask: Task;
  setMessage: (message: string) => void;
  setMessageType: (messageType: MessageType) => void;
  setMessageKey: (key: number) => void;
  handleSeeSubtasks: (subtasks: Task[]) => void;
}

const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  parentTask,
  setMessage,
  setMessageType,
  setMessageKey,
  handleSeeSubtasks,
}) => {
  // Fetch the updated task from the Redux store using its id
  const updatedTask = useSelector((state: RootState) =>
    state.tasks.find((task: Task) => task.id === parentTask.id)
  );

  const displayedSubtasks = updatedTask ? updatedTask.subtasks : subtasks;

  return (
    <ul className="subtasks">
      {displayedSubtasks.map((subtask: Task) => (
        <li key={subtask.id}>
          <TaskCard
            task={subtask}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setMessageKey={setMessageKey}
            handleSeeSubtasks={handleSeeSubtasks}
          />
        </li>
      ))}
    </ul>
  );
};

export default SubtaskList;
