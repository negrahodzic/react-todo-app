// 
import React from 'react';
import { Task } from '../../types/types';
import styles from './ParentTaskCard.module.css';
import { MessageType } from "../Message/Message";

interface ParentTaskCardProps {
  task: Task;
  handleBack: () => void;
  setMessage: (message: string) => void;
  setMessageType: (messageType: MessageType) => void;
  setMessageKey: (key: number) => void;
  handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
}

const ParentTaskCard: React.FC<ParentTaskCardProps> = (props) => {
  const { task, handleBack, setMessage, setMessageType, setMessageKey, handleSeeSubtasks } = props;

  return (
    <div className={styles.parentTaskCard}>
      <button className="button button-back" onClick={handleBack}>
        Back
      </button>
      <div className={styles.taskWrapper}>
        <h2>{task.taskName}</h2>
      </div>
    </div>
  );
};

export default ParentTaskCard;
