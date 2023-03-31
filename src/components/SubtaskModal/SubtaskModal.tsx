import React from 'react';
import styles from './SubtaskModal.module.css';

interface SubtaskModalProps {
  taskName: string;
  subtaskName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddSubtask: () => void;
  handleCloseModal: () => void;
}

function SubtaskModal(props: SubtaskModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add a subtask to {props.taskName}</h2>
        <input
          type="text"
          placeholder="Subtask name"
          value={props.subtaskName}
          onChange={props.handleChange}
          onKeyDown={props.handleKeyDown}
        />
        <button className="button button-add" onClick={props.handleAddSubtask}>
          Add subtask
        </button>
        <button className="button button-delete" onClick={props.handleCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SubtaskModal;
