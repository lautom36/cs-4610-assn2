import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { Projects } from 'server/entities/projects.entity';
import { Role } from 'server/entities/role.entity';
import { Tasks } from 'server/entities/tasks.entity';
import { User } from 'server/entities/user.entity';
import { UserRole } from 'server/entities/user_role.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { TasksService } from 'server/providers/services/tasks.service';
import { UsersService } from 'server/providers/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Projects, User, UserRole, Role])],
  controllers: [TasksController],
  providers: [TasksService, ProjectsService, UsersService],
  exports: [],
})
export class TasksModule {}
