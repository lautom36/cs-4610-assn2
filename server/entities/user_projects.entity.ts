import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projects } from './projects.entity';
import { User } from './user.entity';

@Entity()
export class UserProjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Projects, (project) => project.userProjects)
  project: Projects;

  @ManyToOne(() => User, (user) => user.userProjects)
  user: User;
}
