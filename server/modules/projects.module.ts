import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/api/projects.controller';
import { Projects } from 'server/entities/projects.entity';
import { Tasks } from 'server/entities/tasks.entity';
import { User } from 'server/entities/user.entity';
import { ProjectsService } from 'server/providers/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projects]), Tasks, User],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [],
})
export class ProjectsModule {}