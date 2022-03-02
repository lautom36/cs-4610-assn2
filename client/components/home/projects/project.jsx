import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { useParams } from 'react-router-dom';
import { Input } from '../../common/input';
import { Tasks } from '../tasks/tasks';
import { Button } from '../../common/button';
import { UsersList } from './usersList';

export const Project = () => {
  const { id } = useParams();
  const api = useContext(ApiContext);
  const [currProject, setCurrProject] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTimeEstimation, setTaskTimeEstimation] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [projectsUsers, setProjectsUsers] = useState([]);
  const [addNewUser, setAddNewUser] = useState('');
  const [user, setUser] = useState(null);
  const [addUserErrorMessage, setAddUserErrorMessage] = useState('');

  // get user
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
  }, []);

  // get tasks
  useEffect(async () => {
    const { project } = await api.get(`/projects/${id}`);
    setCurrProject(project);
    setTasks(project.tasks);
    setUserProjects(project.userProjects);

    const testUserProjects = project.userProjects;
    setProjectsUsers(
      testUserProjects.map((userProject) => {
        return userProject.user;
      }),
    );
  }, []);

  // create a task
  const saveTask = async () => {
    setErrorMessage('');
    if (taskTitle === '') {
      setErrorMessage("Task Descripition can't be empty");
      return;
    } else if (taskDescription === '') {
      setErrorMessage("task Description can't be empty");
      return;
    }

    const taskBody = {
      projectId: currProject.id,
      title: taskTitle,
      description: taskDescription,
      timeEstimation: taskTimeEstimation,
    };
    const { task } = await api.post('/tasks', taskBody);
    setTasks([...tasks, task]);
  };

  // assign person to project
  const addUserToProject = async () => {
    setAddUserErrorMessage('');
    if (user.id === currProject.adminId) {
      // email entered is not valid
      const { user } = await api.get(`/users/${addNewUser}`);
      if (user === undefined) {
        setAddUserErrorMessage('Not a valid Email');
        return;
        // not working currently ----------------------------------
      } else if (projectsUsers.includes(user)) {
        setAddUserErrorMessage('User you are trying to add is already in project');
        return;
      }

      const postBody = {
        userId: user.id,
      };
      const { userProject } = await api.post(`/projects/${currProject.id}`, postBody);
      setProjectsUsers([...projectsUsers, user]);
    } else {
      setAddUserErrorMessage('Only project Admin can add people to the project');
    }
  };

  return (
    <div>
      <div className="p-4 bg-gray-400 flex-row mb-1">
        <div>
          <h2>Project Members</h2>
          <UsersList users={projectsUsers} />
          <h1>Add user to project</h1>
          <Input value={addNewUser} onChange={(e) => setAddNewUser(e.target.value)} />
          <div className="text-red-600 pt-1">{addUserErrorMessage}</div>
          <Button onClick={addUserToProject}>Add</Button>
        </div>
      </div>

      <div className="p-4 bg-gray-400 flex-row mb-1">
        <h1>Task Title</h1>
        <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <h1>Task Description</h1>
        <Input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        <h1>Task Time Estimation</h1>
        <Input value={taskTimeEstimation} onChange={(e) => setTaskTimeEstimation(e.target.value)} />
        <div className="text-red-600 pt-1">{errorMessage}</div>
        <Button onClick={saveTask}>Create Task</Button>
      </div>

      <div className="p-4 bg-gray-400 flex-row mb-1">
        <Tasks tasks={tasks} setTasks={setTasks} projectsUsers={projectsUsers} />
      </div>
    </div>
  );
};
