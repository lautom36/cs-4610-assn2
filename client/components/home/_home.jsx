import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { Project } from './projects/project';
import { Projects } from './projects/projects';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); // mine
  const [projectTitle, setProjectTitle] = useState(''); //mine
  const [projectDescription, setProjectDescription] = useState(''); // mine
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projectSelected, setProjectSelected] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  // TODO: clean up ui
  // TODO: need to fix patch on tasks
  // TODO: need to fix patch to add people to project
  // TODO: need to fix find by email

  // mine---------------------------

  // get projects
  useEffect(async () => {
    const { projects } = await api.get('/projects');
    setProjects(projects);
  }, []);

  // save a new project
  const saveProject = async () => {
    setErrorMessage('');
    if (projectTitle === '') {
      setErrorMessage("Project Descripition can't be empty");
      return;
    } else if (projectDescription === '') {
      setErrorMessage("Project Description can't be empty");
      return;
    }

    const projectBody = { title: projectTitle, description: projectDescription };
    const { newProject } = await api.post('/projects', projectBody); // to get this to return i have to have this not in {} and the service cant return a promise
    setProjects([...projects, newProject]);
  };

  // navigage to project after clicking div
  const goToProject = async (project) => {
    console.log('project: ', project);
    console.log('projectid: ', project.id);
    navigate(`/project/${project.id}`);
  };

  // delete a Project
  const deleteProject = async (project) => {
    console.log('deleteProject started');
    const { success } = await api.del(`/projects/${project.id}`);
    if (success) {
      setProjects(projects.filter((p) => p !== project));
    }
  };
  // end mine ----------------------------------

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-400 flex-row">
      <div>
        <h1>Welcom {user.firstName}</h1>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
        <div>
          <h1>Project Title</h1>
          <Input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
          <h1>Project Description</h1>
          <Input value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
          <div className="text-red-600">{errorMessage}</div>
          <Button onClick={saveProject}>Create Project</Button>
        </div>
        <div>
          <Projects projects={projects} deleteProject={deleteProject} goToProject={goToProject} />
        </div>
        {roles.includes('admin') && (
          <Button type="button" onClick={() => navigate('/admin')}>
            Admin
          </Button>
        )}
      </div>
    </div>
  );
};
