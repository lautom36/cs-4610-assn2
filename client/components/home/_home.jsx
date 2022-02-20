import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Project } from './projects';
import { Task } from './tasks';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDesription] = useState('');

  useEffect(async () => {
    const { projects } = await api.get('/projects');
    setLoading(false);
    setProjects(projects);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const saveProject = async () => {
    setErrorMessage('');

    if (projectTitle === '') {
      setErrorMessage('Project Title Cannot Be Empty');
      return;
    } else if (projectDescription === '') {
      setErrorMessage('Project Description Cannot Be Empty');
      return;
    }

    const newProject = {
      title: projectTitle,
      description: projectDescription,
    };

    const { project } = await api.post('/projects', newProject);

    setProjects([...projects, project]);
  };

  const deleteProject = async (project) => {
    const { success } = await api.del(`/notes/${project.id}`);
    if (success) {
      setProjects(projects.filter((n) => n !== project));
    } else {
      setErrorMessage('Deletion Failed');
    }
  };

  return (
    <>
      <div className="flex flex-col h-full w-1/2 p-4">
        <h3 className="text-xl">Projects</h3>
        <textarea
          className="p-2 border-2 rounded flex"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <textarea
          className="p-2 border-2 rounded flex"
          value={projectDescription}
          onChange={(e) => setProjectDesription(e.target.value)}
        />
        <Button onClick={saveProject}>Save</Button>
        <div className="text-red-600">{errorMessage}</div>
        <Project projects={projects} deleteProject={deleteProject} />
      </div>
      <div className="p-4">
        <Button type="button" onClick={logout}>
          Logout
        </Button>
        {roles.includes('admin') && (
          <Button type="button" onClick={() => navigate('/admin')}>
            Admin
          </Button>
        )}
      </div>
    </>
  );
};
