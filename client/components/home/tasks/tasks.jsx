/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Button } from '../../common/button';

export const Tasks = ({ tasks, setTasks}) => {
  const api = useContext(ApiContext);
  // console.log('tasks: ', tasks);

  //TODO: tasks get completed, but the screen does not update
  const updateTaskStatus = async (oldTask) => {
    console.log('oldTask: ', oldTask);
    const { task } = await api.put(`/tasks/${oldTask.id}`);
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
              <h1>{task.title} - {task.user.firstName}</h1>
              <h4>Time estimation: {task.timeEstimation}</h4>
              <h4>{task.description}</h4>
              <h4>Status: {task.status ? 'done': 'not finished'}</h4>
            <div>
              <Button onClick={() => updateTaskStatus(task)}>Complete Task</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

