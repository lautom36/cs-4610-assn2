/* eslint-disable prettier/prettier */
import { Button } from '../common/button';

export const Project = ({ project, deleteProject }) => {
  return (
    <div className="border-2 rounded p-4">
      {project.title}
      {project.description}
      <div>
        <Button onClick={() => deleteProject(project)}>Delete</Button>
      </div>
    </div>
  );
};
