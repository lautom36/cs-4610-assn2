import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/api/projects.controller';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { UsersController } from 'server/controllers/users.controller';
import { Projects } from 'server/entities/projects.entity';
import { Tasks } from 'server/entities/tasks.entity';
import { User } from 'server/entities/user.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { TasksService } from 'server/providers/services/tasks.service';
import { UsersService } from 'server/providers/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Tasks, User])],
  controllers: [ProjectsController, TasksController, UsersController],
  providers: [ProjectsService, TasksService, UsersService],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
