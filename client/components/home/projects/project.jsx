import { useState } from 'react';

export const Project = ({ project }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    console.log('project.jsx: getting tasks');
    const taskBody = { project: project };
    const { tasks } = await api.get('/tasks', taskBody);
    setTasks(tasks);
  }, []);

  return (
    <div>
      <div>
        <h3>{project.title}</h3>
        <h1>{project.description}</h1>
      </div>
      <div>

      </div>
    </div>
  );
};
