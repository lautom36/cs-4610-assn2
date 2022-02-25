/* eslint-disable prettier/prettier */
import { Button } from '../../common/button';

export const Tasks = ({ tasks, deleteTask }) => {
  // need to add a way to complete tasks
  console.log('tasks: ', tasks);
  return (
    <div className="flex-1">
      {tasks.map((task) => {
        return (
          <div
            key={`task_${task.id}`}
            className="border-2 rounded bg-gray-500 text-white"
            onClick={() => completeTask(task.id)}
            >
              <h1>{task.title}</h1>
              <h4>{task.timeEstimation}</h4>
              
              <h4>{task.description}</h4>
              {task.status}
            <div>
              <Button onClick={() => deleteTask(task)}>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

