import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './tasks.entity';
import { UserProjects } from './user_projects.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contextId: string;

  @Column()
  adminId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Tasks, (tasks) => tasks.project)
  tasks: Tasks[];

  @OneToMany(() => UserProjects, (userProjects) => userProjects.project)
  userProjects: UserProjects[];
}
