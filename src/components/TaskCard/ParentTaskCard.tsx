import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Task } from '../../types/types';

import SubtaskModal from '../SubtaskModal/SubtaskModal';
import styles from './ParentTaskCard.module.css';
import { MessageType, showMessage} from "../Message/Message";
import { addSubtask } from '../../redux/store';
import { validateTaskName, checkDuplicateTasks } from '../../utils/taskUtils';

import '../../assets/css/buttons.css';

interface ParentTaskCardProps {
  task: Task;
  handleBack: () => void;
  setMessage: (message: string) => void;
  setMessageType: (messageType: MessageType) => void;
  setMessageKey: (key: number) => void;
  handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
}

const ParentTaskCard: React.FC<ParentTaskCardProps> = (props) => {
  const dispatch = useDispatch();

  const [subtaskName, setSubtaskName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
 * Opens the subtask modal.
 */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
    * Closes the subtask modal.
    */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
    * Adds a subtask to the current task.
    */
  const handleAddSubtask = () => {
    const validationResult = validateTaskName(subtaskName);
    if (!validationResult.isValid) {
      showMessage(validationResult.message || "", validationResult.messageType as MessageType, props.setMessage, props.setMessageType, props.setMessageKey);
      return;
    }

    const isDuplicate = checkDuplicateTasks(props.task.subtasks, subtaskName);

    if (isDuplicate) {
      showMessage("This task already exists.", "error", props.setMessage, props.setMessageType, props.setMessageKey);
      return;
    }

    const subtask: Task = {
      id: Date.now(),
      taskName: subtaskName,
      status: false,
      subtasks: [],
    };

    dispatch(addSubtask({ parentId: props.task.id, subtask }));
    setSubtaskName('');
    handleCloseModal();

    showMessage("Subtask added!", "success", props.setMessage, props.setMessageType, props.setMessageKey);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSubtaskName(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAddSubtask();
    }
  }

  return (
    <div className={styles.parentTaskCard}>
      <button className={styles.buttonBack} onClick={props.handleBack}>
        Back
      </button>
      {!props.task.status && (
        <button className="button button-add" onClick={handleOpenModal}>
          Add subtask
        </button>
      )}
      <div className={styles.taskWrapper}>
        <h2>{props.task.taskName}</h2>
      </div>
      {isModalOpen && (
        <SubtaskModal
          taskName={props.task.taskName}
          subtaskName={subtaskName}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleAddSubtask={handleAddSubtask}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ParentTaskCard;
