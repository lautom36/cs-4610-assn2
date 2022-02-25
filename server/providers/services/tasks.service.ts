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

  async findAllforProject(projectId: number) {
    console.log('tasks.service: findAllForProject started');
    const tasks = await this.taskRepository.find({ where: { projectId: projectId }, relations: ['user'] });
    return tasks;
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
    this.projectRepository.delete(task.id);
  }
}
