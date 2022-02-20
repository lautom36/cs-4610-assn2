import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/api/projects.controller';
import { Projects } from 'server/entities/projects.entity';
import { ProjectsService } from 'server/providers/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projects])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [],
})
export class ProjectsModule {}
