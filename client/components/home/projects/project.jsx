import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { useParams } from 'react-router-dom';
import { Input } from '../../common/input';
import { Tasks } from '../tasks/tasks';
import { Button } from '../../common/button';

export const Project = () => {
  const { id } = useParams();
  const api = useContext(ApiContext);
  const [currProject, setCurrProject] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTimeEstimation, setTaskTimeEstimation] = useState('');
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  // console.log('Started Project');
  // console.log('id: ', id);

  // get tasks
  useEffect(async () => {
    // console.log('project.jsx: getting tasks');
    const { project } = await api.get(`/projects/${id}`);
    setCurrProject(project);
    setTasks(project.tasks);
  }, []);
  // console.log('tasks: ', tasks);

  // save task throws 500 code ----------------------------------------------------
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
    console.log(taskBody);
    const { task } = await api.post('/tasks', taskBody);
    setTasks([...tasks, task]);
    //console.log('project: ', newProject);
  };
  // assign person to project
  const addUserToProject = async (email) => {
    const postBody = {
      email: email,
    };
    const { user } = await api.post(`/projects/${currProject.id}`, postBody);
    setUsers([...users, user]);
  };

  // assign person to task

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
    <div>
      <div>
        <h1>Task Title</h1>
        <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <h1>Task Description</h1>
        <Input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
        <h1>Task Time Estimation</h1>
        <Input value={taskTimeEstimation} onChange={(e) => setTaskTimeEstimation(e.target.value)} />
        <div className="text-red-600">{errorMessage}</div>
        <Button onClick={saveTask}>Create Task</Button>
      </div>
      <div>
        <Tasks tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
};
