import { Task } from '../../types/types';
import { MessageType } from "../Message/Message";
import TaskCard from '../TaskCard/TaskCard';
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
function SubtaskList(props: SubtaskListProps) {
  // Fetch the updated task from the Redux store using its id
  const updatedTask = useSelector((state: RootState) =>
    state.tasks.find((task: Task) => task.id === props.parentTask.id)
  );

  const displayedSubtasks = updatedTask ? updatedTask.subtasks : props.subtasks;

  return (
    <ul className="subtasks">
      {displayedSubtasks.map((subtask: Task) => (
        <li key={subtask.id}>
          <TaskCard
            task={subtask}
            setMessage={props.setMessage}
            setMessageType={props.setMessageType}
            setMessageKey={props.setMessageKey}
            handleSeeSubtasks={props.handleSeeSubtasks}
          />
        </li>
      ))}
    </ul>
  );
};

export default SubtaskList;
