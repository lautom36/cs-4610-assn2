export const Projects = ({ projects }) => {
  return (
    <div className="flex-1">
      {projects.map((project) => {
        return (
          <div>
            <h3>{project.title}</h3>
            <h1>{project.description}</h1>
          </div>
        );
      })}
    </div>
  );
};
