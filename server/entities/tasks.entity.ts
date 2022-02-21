import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projects } from './projects.entity';
import { User } from './user.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  timeEstimation: string;

  @Column()
  status: boolean;

  @ManyToOne(() => Projects, (projects) => projects.tasks, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Projects;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn()
  user: User;
}
