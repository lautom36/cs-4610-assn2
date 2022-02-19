import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { Tasks } from 'server/entities/tasks.entity';
import { TasksService } from 'server/providers/services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
