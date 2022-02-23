import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Input } from '../common/input';
import { Projects } from './projects/projects';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]); // mine
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  // mine
  useEffect(async () => {
    // console.log('getting projects');
    const { projectsRes } = await api.get('/projects');
    setProjects([...projects, projectsRes]);
    // console.log('got projects');
  }, []);
  console.log('projects:', projects);

  const saveProject = async () => {
    console.log('title: ', projectTitle);
    console.log('description: ', projectDescription);
    const projectBody = {
      title: projectTitle,
      description: projectDescription,
    };
    const project = await api.post('/projects', projectBody);
    console.log('project: ', project);
    setProjects([...projects, project]);
    //setProjectContents(projectBody);
  };
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
    <div className="p-4">
      <h1>Welcom {user.firstName}</h1>
      <div>
        <h1>Project Title</h1>
        <Input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
        <h1>Project Description</h1>
        <Input value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        <Button onClick={saveProject}>Create Project</Button>
      </div>
      {/* <NewProject projects={projects} setProjects={setProjects} /> -----------------------want to find out why this dosent work*/}
      <div>{/* <Projects projects={projects} /> */}</div>

      <Button type="button" onClick={logout}>
        Logout
      </Button>
      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
    </div>
  );
};
