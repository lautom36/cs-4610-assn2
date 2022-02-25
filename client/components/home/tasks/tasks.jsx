/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Button } from '../../common/button';

export const Tasks = ({ tasks, deleteTask , setTasks}) => {
  const api = useContext(ApiContext);
  // console.log('tasks: ', tasks);

  // need to add a way to complete tasks
  const updateTaskStatus = async (oldTask) => {
    const { task } = await api.patch(`/tasks/${oldTask.id}`);
    let updateTasks = tasks;
    let i = updateTasks.indexOf(oldTask);
    updateTasks[i] = task;
    setTasks(updateTasks);
  };

  return (
    <div className="flex-1">
      {tasks.map((task) => {
        return (
          <div
            key={`task_${task.id}`}
            className="border-2 rounded bg-gray-500 text-white"
            >
              <h1>{task.title} - {task.user.firstName}</h1>
              <h4>Time estimation: {task.timeEstimation}</h4>
              <h4>{task.description}</h4>
            <div>
              <Button onClick={() => deleteTask(task)}>Delete</Button>
            </div>
            <div>
              <Button onClick={() => updateTaskStatus(task.id)}>Complete Task</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

