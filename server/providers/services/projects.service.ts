import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'server/entities/projects.entity';
import { User } from 'server/entities/user.entity';
import { UserProjects } from 'server/entities/user_projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProjects)
    private userProjectsRepository: Repository<UserProjects>,
  ) {}

  async findAllForUser(id: number): Promise<Projects[]> {
    console.log('projects.service: findAllForUser started');
    const user = await this.userRepository.findOne(id, {
      relations: ['userProjects', 'userProjects.project'],
    });

    return user.userProjects.map((userProject) => {
      return userProject.project;
    });
  }

  findProjectById(id: number): Promise<Projects> {
    return this.projectRepository.findOne(id);
  }

  createProject(project: Projects): Promise<Projects> {
    console.log('projects.service: createProject started');
    return this.projectRepository.save(project);
  }

  saveUserProject(userProject: UserProjects) {
    return this.userProjectsRepository.save(userProject);
  }

  addUser(project: Projects): Promise<Projects> {
    return this.projectRepository.save(project);
  }

  removeProject(project: Projects) {
    this.projectRepository.delete(project);
  }
}
