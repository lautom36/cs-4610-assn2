import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { Tasks } from 'server/entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TasksController],
  providers: [],
  exports: [],
})
export class TasksModule {}
