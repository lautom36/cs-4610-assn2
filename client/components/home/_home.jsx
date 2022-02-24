import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { NewProject } from './projects/newProject';
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
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  // TODO: clean up ui
  // TODO: make projects clickable and switch pages
  // TODO: check the other api calls

  // mine

  // get projects
  useEffect(async () => {
    const { projects } = await api.get('/projects');
    setProjects(projects);
  }, []);
  console.log(projects);

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
    //console.log('project: ', newProject);
  };
  // console.log('projects after post:', projects);

  // delete a Project
  const deleteProject = async (project) => {
    const { success } = await api.del(`/projects/${project.id}`);
    if (success) {
      setProjects(projects.filter((p) => p !== project));
    }
  };
  console.log(projects);
  // end mine

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
    <div className="p-4 bg-gray-400">
      <h1>Welcom {user.firstName}</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
      <div className="p-4">
        <h1>Project Title</h1>
        <Input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
        <h1>Project Description</h1>
        <Input value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        <div className="text-red-600">{errorMessage}</div>
        <Button onClick={saveProject}>Create Project</Button>
      </div>
      <NewProject projects={projects} setProjects={setProjects} />
      <div>
        <Projects projects={projects} deleteProject={deleteProject} />
      </div>

      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
    </div>
  );
};
