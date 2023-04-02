import { Task } from '../../types/types';

import '../../assets/css/buttons.css';

interface TaskActionsProps {
    task: Task;
    handleOpenModal: () => void;
    handleDeleteTask: () => void;
    handleSeeSubtasks: (subtasks: Task[], parentTask: Task) => void;
    hideSeeSubtasksButton?: boolean;
    className?: string;
}

function TaskActions(props: TaskActionsProps) {
    return (
        <div className={`${props.className || ''}`}>
            <div className="button-group">
                {!props.task.status && (
                    <>
                        <button className="button button-add" onClick={props.handleOpenModal}>
                            Add subtask
                        </button>
                        {props.task.subtasks.length > 0 && !props.hideSeeSubtasksButton && (
                            <button className="button button-details" onClick={() => props.handleSeeSubtasks(props.task.subtasks, props.task)}>
                                See subtasks ({props.task.subtasks.length})
                            </button>
                        )}
                    </>
                )}
                <button className="button button-delete" onClick={props.handleDeleteTask}>
                    {!props.task.status ? 'Delete' : 'Remove'}
                </button>
            </div>
        </div>
    );
};

export default TaskActions;
