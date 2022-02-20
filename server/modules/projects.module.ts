import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/api/projects.controller';
import { Projects } from 'server/entities/projects.entity';
import { Role } from 'server/entities/role.entity';
import { User } from 'server/entities/user.entity';
import { UserRole } from 'server/entities/user_role.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, User, UserRole, Role])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService],
  exports: [],
})
export class ProjectsModule {}
