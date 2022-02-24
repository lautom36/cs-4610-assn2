import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'server/entities/projects.entity';
import { User } from 'server/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllForUser(id: number): Promise<Projects[]> {
    console.log('projects.service: findAllForUser started');
    const user = await this.userRepository.findOne(id, {
      relations: ['userProjects'],
    });
    const userProjects = user.userProjects;
    let keys: number[];
    for (let i = 0; i < userProjects.length; i++) {
      keys.concat(userProjects[i].projectId);
    }
    let project: Projects[];
    if (keys !== undefined) {
      for (let i = 0; i < keys.length; i++) {
        const j = await this.projectRepository.find({ where: { id: keys[i] } });
        project.concat(j);
      }
    }

    return project;
  }

  findProjectById(id: number): Promise<Projects> {
    return this.projectRepository.findOne(id);
  }

  createProject(project: Projects): Promise<Projects> {
    console.log('projects.service: createProject started');
    return this.projectRepository.save(project);
  }

  addUser(project: Projects): Promise<Projects> {
    return this.projectRepository.save(project);
  }

  removeProject(project: Projects) {
    this.projectRepository.delete(project);
  }
}
