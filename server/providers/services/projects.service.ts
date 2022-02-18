import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'server/entities/projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
  ) {}

  findAllForUser(userId: number): Promise<Projects[]> {
    return this.projectRepository.find({
      where: { userId },
    });
  }

  findProjectById(id: number) {
    return this.projectRepository.findOne(id);
  }

  createProject(project: Projects): Promise<Projects> {
    return this.projectRepository.save(project);
  }

  removeProject(project: Projects) {
    this.projectRepository.delete(project);
  }
}
