import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { MainEntity } from '../shared/database/base.entity';
import { Role } from './role.entity';
import { UpdateUserDto } from '../modules/user/dto/update-user.dto';
import { CreateUserDto } from '../modules/user/dto/create-user.dto';

@Unique('UNIQUE_USER_EMAIL', ['email'])
@Unique('UNIQUE_USER_PHONE', ['phone'])
@Entity({ name: 'users' })
export class UserEntity extends MainEntity {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 30, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  phone: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  password: string;

  @Column({ type: 'date', nullable: true, name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;

  @Column({
    default: false,
    type: 'boolean',
    name: 'email_activated',
  })
  @Exclude()
  emailActivated: boolean;

  @Column({ nullable: false, default: 0, name: 'invalid_logins' })
  @Exclude()
  invalidLogins: number;

  @Column({
    nullable: true,
    type: 'timestamp',
    name: 'invalid_login_timestamp',
  })
  @Exclude()
  invalidLoginTimestamp: Date;

  @ManyToMany(
    () => Role,
    (role) => role.users, //optional
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  constructor(data?: Partial<UserEntity | UpdateUserDto | CreateUserDto>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }
}
