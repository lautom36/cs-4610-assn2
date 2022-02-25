import { useContext, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Button } from '../../common/button';
import { Input } from '../../common/input';

export const NewProject = ({ projects, setProjects }) => {
  console.log('newProject: started');
  const api = useContext(ApiContext);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const saveProject = async () => {
    const projectBody = { title: projectTitle, description: projectDescription };
    const { project } = await api.post('/projects', projectBody);
    setProjects([...projects, project]);
    setProjectContents(projectBody);
  };

  return (
    <div>
      <h1>Project Title</h1>
      <Input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
      <h1>Project Description</h1>
      <Input value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
      <Button onClick={saveProject}>Create Project</Button>
    </div>
  );
};
