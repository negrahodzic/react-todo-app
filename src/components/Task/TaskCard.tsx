import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Task } from '../../types/types';
import { updateTask, addSubtask, deleteTask } from '../../redux/store';
import { validateTaskName, checkDuplicateTasks } from '../../utils/taskUtils';

import SubtaskModal from '../Subtask/SubtaskModal';
import TaskLabel from './TaskLabel';
import TaskActions from './TaskActions';

import { MessageType, showMessage } from "../Message/Message";

import '../../assets/css/buttons.css';
import '../../assets/css/grid.css';
import '../TaskInput/TaskInput.css';

/**
 * Props for the TaskCard component.
 */
interface TaskCardProps {
    task: Task;
    setMessage: (message: string) => void;
    setMessageType: (messageType: MessageType) => void;
    setMessageKey: (messageKey: number) => void;
    handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
    hideSeeSubtasksButton?: boolean;
    className?: string;
}

/**
 * Component to render a task as a card.
 */
function TaskCard(props: TaskCardProps) {
    const { id, taskName, status, subtasks } = props.task;

    const dispatch = useDispatch();

    const [subtaskName, setSubtaskName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskName, setEditedTaskName] = useState(taskName);

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

        const isDuplicate = checkDuplicateTasks(subtasks, subtaskName);

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

        dispatch(addSubtask({ parentId: id, subtask }));
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

    const handleStatusChange = () => {
        if (!isEditing) {
            const updatedTask = { ...props.task, status: !status };
            dispatch(updateTask(updatedTask));
            showMessage(status ? "Task marked as incomplete!" : "Task marked as complete!", "success", props.setMessage, props.setMessageType, props.setMessageKey);
        }
    };

    const handleDeleteTask = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(id));
        }
    }

    const handleEditSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        const updatedTask = { ...props.task, taskName: editedTaskName };
        dispatch(updateTask(updatedTask));
    };

    return (
        <>
            <div className={`todo-item ${props.className || ''} ${status ? 'completed' : ''}`}>
                <input type="checkbox" id={`task-${id}`} checked={status} onChange={handleStatusChange} />

                <TaskLabel
                    htmlFor={`task-${id}`}
                    taskName={taskName}
                    editedTaskName={editedTaskName}
                    status={status}
                    isEditing={isEditing}
                    onLabelClick={() => !status && setIsEditing(true)}
                    setEditedTaskName={setEditedTaskName}
                    handleSaveEdit={handleSaveEdit}
                    handleEditSubmit={handleEditSubmit}
                />

                <TaskActions
                    task={props.task}
                    handleOpenModal={handleOpenModal}
                    handleDeleteTask={handleDeleteTask}
                    handleSeeSubtasks={props.handleSeeSubtasks}
                    hideSeeSubtasksButton={props.hideSeeSubtasksButton || false}
                />
            </div>

            {isModalOpen && (
                <SubtaskModal
                    taskName={taskName}
                    subtaskName={subtaskName}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    handleAddSubtask={handleAddSubtask}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </>
    );
};

export default TaskCard;
