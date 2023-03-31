import React from 'react';

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
        <div className="modal">
            <div className="modal-content">
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
};

export default SubtaskModal;
