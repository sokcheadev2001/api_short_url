import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'links' })
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  short_url: string;

  @Column()
  long_url: string;

  @Column()
  ip: string;

  @Column({ default: 0 })
  clicks: number;

  @Column({ default: false })
  is_diabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.links)
  user: User;
}
