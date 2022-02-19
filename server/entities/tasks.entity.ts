import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Projects } from './projects.entity';
import { User } from './user.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  timeEstimation: string;

  @Column()
  status: boolean;

  @OneToMany(() => Projects, (projects) => projects.tasks)
  project: Projects;

  @ManyToMany(() => User, (user) => user.tasks)
  user: User;
}
