import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './tasks.entity';
import { User } from './user.entity';

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

  @ManyToOne(() => Tasks, (tasks) => tasks.project)
  tasks: Tasks;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  user: User[];
}
