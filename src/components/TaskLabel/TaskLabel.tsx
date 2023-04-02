import React from 'react';

import styles from './TaskLabel.module.css';

interface TaskLabelProps {
    htmlFor: string;
    taskName: string;
    editedTaskName: string;
    status: boolean;
    isEditing: boolean;
    onLabelClick: () => void;
    setEditedTaskName: (value: string) => void;
    handleSaveEdit: () => void;
    handleEditSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function TaskLabel(props: TaskLabelProps) {
    return (
        <div className={styles.taskLabel}>
            {props.isEditing ? (
                <input
                    type="text"
                    className={styles.editingTaskInput}
                    value={props.editedTaskName}
                    onBlur={props.handleSaveEdit}
                    onKeyDown={props.handleEditSubmit}
                    onChange={(e) => {
                        props.setEditedTaskName(e.target.value);
                    }}
                    autoFocus
                />
            ) : (
                <label
                    htmlFor={props.htmlFor}
                    className={props.status ? '' : styles.editableTaskLabel}
                    onClick={() => !props.status && !props.isEditing && props.onLabelClick()}
                >
                    {props.taskName}
                </label>
            )}
        </div>
    );
};

export default TaskLabel;
