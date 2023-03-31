/**
The main component that serves as the entry point for the task management application.
Displays the list of tasks and allows for creation, editing, and deletion of tasks.
@returns JSX element that renders the task management application.
*/

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Task } from './types/types';
import { RootState } from './redux/store';
import TaskList from './components/Task/TaskList';
import TaskCard from './components/Task/TaskCard';
import TaskInput from './components/TaskInput/TaskInput';
import Message, { MessageType } from "./components/Message/Message";
import { findTaskById } from "./utils/taskUtils";
import { setNavStack } from './redux/navigationSlice';

// Importing CSS files
import './App.css';
import './assets/css/buttons.css';
import './assets/css/grid.css';
function App() {
  // Getting the list of all tasks from the Redux store
  const tasks = useSelector((state: RootState) => state.tasks.tasks,);
  
  const { currentParent, currentTasks } = useSelector((state: RootState) => state.navigation);

  // State variables for message and its type to display to the user
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("success");
  const [messageKey, setMessageKey] = useState(0);

  // Getting the current parent and tasks from the Redux store for navigation

  // Getting the navigation stack from the Redux store and defining dispatch function
  const navStack = useSelector((state: RootState) => state.navigation.navStack);
  const dispatch = useDispatch();

  /**
    Handles the display of subtasks for a given parent task when the "See subtasks" button is clicked.
    @param subtasks Array of subtasks for the parent task.
    @param parentTask Parent task for the subtasks.
  */
  const handleSeeSubtasks = (subtasks: Task[], parentTask: Task) => {
    const updatedParentTask = findTaskById(tasks, parentTask.id);
    if (updatedParentTask) {
      const newNavStack = [...navStack, { parent: parentTask, tasks: subtasks }];
      dispatch(setNavStack(newNavStack));
    }
  };

  // Function to handle "Back" button click
  const handleBack = () => {
    if (navStack.length <= 1) {
      dispatch(setNavStack([]));
      return;
    }
    const newNavStack = [...navStack];
    newNavStack.pop();
    dispatch(setNavStack(newNavStack));
  };



  return (
    <div className="todo-app-container">

      {/* Render TaskInput component only when no current parent is present */}
      {!currentParent && (<div className="add-task-wrapper">
        <TaskInput setMessage={setMessage} setMessageType={setMessageType} setMessageKey={setMessageKey} />
      </div>
      )}

      {/* Render message component when message is present */}
      {message && <Message key={messageKey} message={message} type={messageType} />}

      {/* Render TaskCard component when current parent is present */}
      {currentParent && (
        <div className="tasks-navigation">
          <button className="button button-back" onClick={handleBack}>
            Back
          </button>
          <div className="parent-task">
            <TaskCard
              className="task-card"
              task={currentParent}
              setMessage={setMessage}
              setMessageType={setMessageType}
              setMessageKey={setMessageKey}
              handleSeeSubtasks={(subtasks) => handleSeeSubtasks(subtasks, currentParent)}
              hideSeeSubtasksButton
            />
          </div>
        </div>
      )}

      {/* Render TaskList component for all tasks */}
      <TaskList
        tasks={tasks}
        setMessage={setMessage}
        setMessageType={setMessageType}
        setMessageKey={setMessageKey}
        handleSeeSubtasks={(subtasks, parentTask) => handleSeeSubtasks(subtasks, parentTask)}
      />
    </div>
  );

}

export default App;
