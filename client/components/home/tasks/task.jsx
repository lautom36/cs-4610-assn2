import { useState } from 'react';
import { Button } from '../../common/button';
import { Input } from '../../common/input';

export const Task = ({ task, errorMessage, addUserToTask }) => {
  const [email, setEmail] = useState('');
  return (
    <div>
      <div>
        <h1>
          {task.title} - {task.user === null ? '' : task.user.firstName}
        </h1>
        <h4>Time estimation: {task.timeEstimation}</h4>
        <h4>{task.description}</h4>
        <h4>Status: {task.status ? 'done' : 'not finished'}</h4>
      </div>

      <div>
        <h1>Assign a person to a task</h1>
        <Input className="text-black" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={() => addUserToTask(task, email)}>Assign person to task</Button>
        <div className="text-red-600 pt-1">{errorMessage}</div>
      </div>

      <div>
        <Button onClick={() => updateTaskStatus(task)}>Complete Task</Button>
      </div>
    </div>
  );
};
