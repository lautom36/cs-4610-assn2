import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { Projects } from 'server/entities/projects.entity';
import { Tasks } from 'server/entities/tasks.entity';
import { User } from 'server/entities/user.entity';
import { TasksService } from 'server/providers/services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), Projects, User],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
