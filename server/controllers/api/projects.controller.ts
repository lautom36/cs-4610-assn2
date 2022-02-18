import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { notEqual } from 'assert';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Projects } from 'server/entities/projects.entity';
import { ProjectsService } from 'server/providers/services/projects.service';

class ProjectPostBody {
  adminId: number;
  contextId: string;
  description: string;
  title: string;
}

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const projects = await this.projectsService.findAllForUser(jwtBody.userId);
    return projects;
  }

  @Get('/projects:id')
  public async show(@Param('id') id: string) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    return project;
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ProjectPostBody) {
    let project = new Projects();
    project.adminId = body.adminId;
    project.contextId = 'randSting';
    project.description = body.description;
    project.title = body.title;
    project = await this.projectsService.createProject(project);
    return { project };
  }

  @Patch('/projects:id')
  public async update(@Param('id') id: string) {
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
