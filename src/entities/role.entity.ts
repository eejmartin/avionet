import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainEntity } from '../shared/database/base.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Role extends MainEntity {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  users?: UserEntity[];

  constructor(data?: Partial<Role>) {
    super();

    this.id = data?.id;
  }
}
