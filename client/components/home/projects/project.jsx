import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { useParams } from 'react-router-dom';
import { Input } from '../../common/input';
import { Tasks } from '../tasks/tasks';
import { Button } from '../../common/button';
import { UsersList } from './usersList';
import { forEach } from 'lodash';

export const Project = () => {
  const { id } = useParams();
  const api = useContext(ApiContext);
  const [currProject, setCurrProject] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTimeEstimation, setTaskTimeEstimation] = useState('');
  const [taskUserEmail, setTaskUserEmail] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [projectsUsers, setProjectsUsers] = useState([]);
  const [addNewUser, setAddNewUser] = useState('');

  // get tasks
  useEffect(async () => {
    // console.log('project.jsx: getting tasks');
    const { project } = await api.get(`/projects/${id}`);
    // console.log('project: ', project);
    setCurrProject(project);
    setTasks(project.tasks);
    setUserProjects(project.userProjects);

    // TODO: would like to refactor this part because when you save the page an extra person gets added to Project Members ---------------------------------
    const testUserProjects = project.userProjects;
    testUserProjects.forEach((i) => {
      if (!projectsUsers.includes(i.user)) {
        setProjectsUsers([...projectsUsers, i.user]);
      }
    });
  }, []);
  // console.log('users: ', projectsUsers);

  // console.log(userProjects);
  const saveTask = async () => {
    setErrorMessage('');
    if (taskTitle === '') {
      setErrorMessage("Task Descripition can't be empty");
      return;
    } else if (taskDescription === '') {
      setErrorMessage("task Description can't be empty");
      return;
    }

    // TODO: testing remove when done -------------------------------------------------------
    const { users } = await api.get(`/users`);
    console.log('users: ', users);

    // TODO: problem get. even if email is right it wont get -----------------------------
    // find if given email is valid
    // console.log('email: ', taskUserEmail);
    // const { user } = await api.get(`/user/${taskUserEmail}`);
    // if (user === undefined) {
    //   setErrorMessage('Not a valid Email');
    //   return;
    // }

    const user = users[1];
    console.log(user);

    // check if user is in the project
    let userInProject = false;
    userProjects.forEach((userProject) => {
      if (userProject.userId === user.id) {
        userInProject = true;
      }
    });

    if (!userInProject) {
      setErrorMessage('User you are trying to add to task is not in project. Try adding them to the project first');
      return;
    }

    const taskBody = {
      projectId: currProject.id,
      title: taskTitle,
      description: taskDescription,
      timeEstimation: taskTimeEstimation,
      user: user,
    };
    //console.log('taskBody: ', taskBody);
    const { task } = await api.post('/tasks', taskBody);
    setTasks([...tasks, task]);
    //console.log('project: ', newProject);
  };

  // TODO: get patch working ------------------------------------------------------
  // assign person to project
  const addUserToProject = async (email) => {
    const postBody = {
      email: email,
    };
    const { user } = await api.patch(`/projects/${currProject.id}`, postBody);
    setProjectsUsers([...projectsUsers, user]);
  };

  // delete task
  const deleteTask = async (task) => {
    console.log('deleteTask started');
    const { success } = await api.del(`/tasks/${task.id}`);
    if (success) {
      setTasks(tasks.filter((p) => p !== task));
    }
  };
  //console.log(tasks);

  return (
    <div className="p-4 bg-gray-400 flex-row">
      <div className="pb-1">
        <h1>Task Title</h1>
        <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <h1>Task Description</h1>
        <Input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        <h1>Task Time Estimation</h1>
        <Input value={taskTimeEstimation} onChange={(e) => setTaskTimeEstimation(e.target.value)} />
        <h1>Assign a person to a task</h1>
        <Input type="email" value={taskUserEmail} onChange={(e) => setTaskUserEmail(e.target.value)} />
        <div className="text-red-600 pt-1">{errorMessage}</div>
        <Button onClick={saveTask}>Create Task</Button>
      </div>
      <div>
        <Tasks tasks={tasks} deleteTask={deleteTask} setTasks={setTasks} />
      </div>
      <div>
        <div>
          <h1>Add user to project</h1>
          <Input value={addNewUser} onChange={(e) => setAddNewUser(e.target.value)} />
          <Button onClick={addUserToProject}>Add</Button>
        </div>
        <h2>Project Members</h2>
        <UsersList users={projectsUsers} />
      </div>
    </div>
  );
};
