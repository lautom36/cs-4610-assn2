import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from 'server/entities/projects.entity';
import { Tasks } from 'server/entities/tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
  ) {}

  findAllforProject(project: Projects): Promise<Tasks[]> {
    const projectId = project.id;
    return this.taskRepository.find({
      where: { projectId },
    });
  }

  findTaskById(id: number): Promise<Tasks> {
    return this.taskRepository.findOne(id);
  }

  createTask(task: Tasks): Promise<Tasks> {
    return this.taskRepository.save(task);
  }

  updateStatus(task: Tasks): Promise<Tasks> {
    return this.taskRepository.save(task);
  }

  addUser(task: Tasks): Promise<Tasks> {
    return this.taskRepository.save(task);
  }

  removeTask(task: Tasks) {
    this.projectRepository.delete(task);
  }
}
