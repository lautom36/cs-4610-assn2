import { Button } from '../../common/button';

export const Projects = ({ projects, deleteProject, goToProject }) => {
  console.log(projects);
  return (
    <div className="flex-1">
      {projects.map((project) => {
        return (
          <div
            key={`project_${project.id}`}
            className="border-2 rounded bg-gray-500 text-white"
            onClick={() => goToProject(project)}
          >
            {project.title}
            <div>
              <Button onClick={() => deleteProject(project)}>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
