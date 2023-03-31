import { Task } from '../../types/types';

import '../../assets/css/buttons.css';

interface TaskActionsProps {
    task: Task;
    handleOpenModal: () => void;
    handleDeleteTask: () => void;
    handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
    hideSeeSubtasksButton?: boolean;
}

function TaskActions(props: TaskActionsProps) {
    return (
        <div className="button-group">
            {!props.task.status && (
                <>
                    <button className="button button-add" onClick={props.handleOpenModal}>
                        Add subtask
                    </button>
                    {props.task.subtasks.length > 0 && !props.hideSeeSubtasksButton && (
                        <button className="button button-details" onClick={() => props.handleSeeSubtasks(props.task.subtasks, props.task)}>
                            See subtasks
                        </button>
                    )}
                </>
            )}
            <button className="button button-delete" onClick={props.handleDeleteTask}>
                {!props.task.status ? 'Delete' : 'Remove'}
            </button>
        </div>
    );
};

export default TaskActions;
