import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { parse } from 'path/posix';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Projects } from 'server/entities/projects.entity';
import { Tasks } from 'server/entities/tasks.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { TasksService } from 'server/providers/services/tasks.service';
import { UsersService } from 'server/providers/services/users.service';

class TaskByProjectBody {
  project: Projects;
}

class TaskPostBody {
  projectId: number;

  title: string;

  description: string;

  timeEstimation: string;
}

class TaskAddUserBody {
  email: string;
}

@Controller()
export class TasksController {
  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private taskService: TasksService,
  ) {}

  @Get('/tasks')
  public async index(@Body() body: TaskByProjectBody) {
    const tasks = await this.taskService.findAllforProject(body.project);
    return tasks;
  }

  @Get('/tasks/:id')
  public async show(@Param('id') id: string) {
    const task = await this.taskService.findTaskById(parseInt(id, 10));
    return task;
  }

  @Post('/tasks')
  public async create(@Body() body: TaskPostBody) {
    const project = await this.projectsService.findProjectById(body.projectId);
    let task = new Tasks();
    task.description = body.description;
    task.project = project;
    task.projectId = body.projectId;
    task.status = false;
    task.title = body.title;
    task.timeEstimation = body.timeEstimation;
    task = await this.taskService.createTask(task);
    return { task };
  }

  @Patch('/tasks/:id')
  public async updateStatus(@Param('id') id: string) {
    let task = await this.taskService.findTaskById(parseInt(id, 10));
    task.status = !task.status;
    task = await this.taskService.updateStatus(task);
    return { task };
  }

  @Patch('/tasks/:id/userId')
  public async addUser(@Param('id') id: string, @Body() body: TaskAddUserBody) {
    let task = await this.taskService.findTaskById(parseInt(id, 10));
    const user = await this.usersService.findByEmail(body.email);
    task.user = user;
    task = await this.taskService.addUser(task);
    return { task };
  }

  @Delete('/tasks:id')
  public async destroy(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const task = await this.taskService.findTaskById(parseInt(id, 10));
    const project = await this.projectsService.findProjectById(task.projectId);
    if (project.adminId !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }
    this.taskService.removeTask(task);
    return { success: true };
  }
}
