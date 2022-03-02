/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Button } from '../../common/button';
import { Input } from '../../common/input';
import { Task } from './task';

export const Tasks = ({ tasks, setTasks, projectsUsers}) => {
  const api = useContext(ApiContext);
  const [taskUserEmail, setTaskUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // update the task
  const updateTaskStatus = async (oldTask) => {
    const { task } = await api.put(`/tasks/${oldTask.id}`);
    let updateTasks = [...tasks];
    let i = updateTasks.indexOf(oldTask);
    updateTasks[i] = {...oldTask, ...task};
    setTasks(updateTasks);
  };

  const addUserToTask = async ( oldTask, email) => {
    setErrorMessage('')
    // find if given email is valid
    const { user } = await api.get(`/users/${email}`);
    if (user === undefined) {
      setErrorMessage('Not a valid Email');
      return;
    }

    // check if user is in the project
    let userInProject = false;
    projectsUsers.forEach((userProject) => {
      const userProjectId = parseInt(userProject.id, 10);
      const userId = parseInt(user.id, 10);
      if (userProjectId === userId) {
        userInProject = true;
      }
    });

    if (!userInProject) {
      setErrorMessage('User you are trying to add to task is not in project. Try adding them to the project first');
      return;
    }
    taskBody = {
      user: user
    }

    // add user to task
    const { task } = await api.put(`/tasks/user/${oldTask.id}`, taskBody);
    let updateTasks = [...tasks];
    let i = updateTasks.indexOf(oldTask);
    updateTasks[i] = {...oldTask, ...task};
    setTasks(updateTasks);
  };

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div
            key={`task_${task.id}`}
            className="border-2 rounded bg-gray-500 text-white mb-1"
          >
            <Task task={task} errorMessage={errorMessage} addUserToTask={addUserToTask} />
          </div>
        );
      })}
    </div>
  );
};









