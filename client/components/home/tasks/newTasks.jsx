import { useState } from 'react';

export const newTask = ({ projectId, tasks, setTasks }) => {
  const api = useContext(ApiContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTimeEstimation, setTaskTimeEstimation] = useState('');

  const saveTask = async () => {
    const taskBody = {
      projectId: projectId,
      title: taskTitle,
      description: taskDescription,
      timeEstimation: taskTimeEstimation,
    };
    const { task } = await api.post('/tasks', taskBody);
    setTasks([...tasks, task]);
    setProjectContents(projectBody);
  };

  return (
    <div>
      <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      <input value={taskTimeEstimation} onChange={(e) => setTaskTimeEstimation(e.target.value)} />
      <Button onClick={saveTask}>Create Task</Button>
    </div>
  );
};
