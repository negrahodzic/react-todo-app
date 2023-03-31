/**

TaskInput component that allows user to add a new task.
@param setMessage Function that sets the message to be displayed.
@param setMessageType Function that sets the type of message to be displayed.
@param setMessageKey Function that sets the key for the message to be displayed.
*/

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, RootState } from '../../redux/store';
import { Task } from '../../types/types';
import { MessageType, showMessage } from "../Message/Message";
import { validateTaskName, checkDuplicateTasks } from '../../utils/taskUtils';

import './TaskInput.css';
import '../../assets/css/buttons.css';

type TaskInputProps = {
    setMessage: (message: string) => void;
    setMessageType: (messageType: MessageType) => void;
    setMessageKey: (key: number) => void;
};

function TaskInput(props: TaskInputProps) {
    const [task, setTask] = useState('');
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const dispatch = useDispatch();

    /**
    *  Function to handle adding a new task.
    */
    function handleAddTask() {

        const validationResult = validateTaskName(task);
        if (!validationResult.isValid) {
            showMessage(validationResult.message || "", validationResult.messageType as MessageType, props.setMessage, props.setMessageType, props.setMessageKey);
            return;
        }

        const isDuplicate = checkDuplicateTasks(tasks, task);

        if (isDuplicate) {
            showMessage("This task already exists.", "error", props.setMessage, props.setMessageType, props.setMessageKey);
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            taskName: task,
            status: false,
            subtasks: [],
        };

        dispatch(addTask(newTask));
        setTask('');
        showMessage("Task added successfully.", "success", props.setMessage, props.setMessageType, props.setMessageKey);
    }

    /**
     * Function to handle input change for new task.
     * @param e Event object containing the input value.
     */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setMessage("");
        props.setMessageType("info");
        setTask(e.target.value);
    }

    /**
     * Function to handle adding a new task on pressing Enter key.
     * @param e Event object containing the key press event.
     */
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    }

    return (
        <div className="task-input">
            <input
                type="text"
                className="task-input-field"
                placeholder="Add your task"
                value={task}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus />
            <button
                className="button button-add"
                onClick={handleAddTask}>
                Add to todo
            </button>
        </div>
    );
};

export default TaskInput;