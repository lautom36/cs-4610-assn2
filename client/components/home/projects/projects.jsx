import { Button } from '../../common/button';

export const Projects = ({ projects, deleteProject }) => {
  console.log(projects);
  return (
    <div className="flex-1">
      {projects.map((project) => {
        return (
          <div key={`project_${project.id}`} className="border-2 rounded p-4 bg-gray-500 text-white">
            {project.title}
            <div>
              <Button onclick={() => deleteProject(project)}>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
