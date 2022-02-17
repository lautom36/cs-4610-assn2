import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Projects } from './projects.entity';
import { RefreshToken } from './refresh_token.entity';
import { Tasks } from './tasks.entity';
import { UserRole } from './user_role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];

  @OneToMany(() => Projects, (projects) => projects.user)
  projects: Projects[];

  @OneToMany(() => Tasks, (tasks) => tasks.user)
  tasks: Tasks[];
}
