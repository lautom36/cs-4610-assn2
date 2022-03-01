import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Projects } from 'server/entities/projects.entity';
import { User } from 'server/entities/user.entity';
import { UserProjects } from 'server/entities/user_projects.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';

class ProjectPostBody {
  title: string;
  description: string;
}

class ProjectPatchBody {
  userId: number;
}

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService, private userService: UsersService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    console.log('projects.controller: @Get(/projects) started');
    const projects = await this.projectsService.findAllForUser(jwtBody.userId);
    return { projects };
  }

  @Get('/projects/:id')
  public async show(@Param('id') id: string) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    return { project };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ProjectPostBody) {
    console.log('projects.controller: @Post(/projects) started');
    let newProject = new Projects();
    newProject.adminId = jwtBody.userId;
    newProject.contextId = 'randSting';
    newProject.description = body.description;
    newProject.title = body.title;
    newProject.tasks = [];
    newProject = await this.projectsService.createProject(newProject);
    const userProject = new UserProjects();
    userProject.userId = jwtBody.userId;
    userProject.projectId = newProject.id;
    await this.projectsService.saveUserProject(userProject);
    return { newProject };
  }

  @Post('/projects/:id')
  public async update(@Param('id') id: string, @Body() body: ProjectPatchBody) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    let userProject = new UserProjects();
    userProject.userId = body.userId;
    userProject.projectId = parseInt(id, 10);
    userProject = await this.projectsService.saveUserProject(userProject);
    return { userProject };
  }

  @Delete('/projects/:id')
  public async destroy(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    if (project.adminId !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }
    this.projectsService.removeProject(project);
    return { success: true };
  }
}
