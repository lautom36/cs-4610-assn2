/* eslint-disable prettier/prettier */
import { Button } from '../common/button';

export const Task = ({ task, completeTask }) => {
  return (
    <div className="border-2 rounded p-4">
      {task.title}
      {task.timeEstimation}
      {task.description}
      {task.status}
      <div>
        <Button onClick={() => completeTask(task)}>Complete</Button>
      </div>
    </div>
  );
};
