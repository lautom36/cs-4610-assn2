import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './tasks.entity';
import { User } from './user.entity';

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contextId: string;

  @Column()
  admin: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Tasks, (tasks) => tasks.project)
  tasks: Tasks;

  @OneToMany(() => User, (user) => user.projects)
  users: User;
}
