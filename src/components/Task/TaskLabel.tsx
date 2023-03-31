import React from 'react';

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
        <>
            {props.isEditing ? (
                <input
                    type="text"
                    className="editing-task-input"
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
                    className={props.status ? '' : 'editable-task-label'}
                    onClick={() => !props.status && !props.isEditing && props.onLabelClick()}
                >
                    {props.taskName}
                </label>
            )}
        </>
    );
};

export default TaskLabel;
