import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ERRORS_CONSTANTS } from '../../shared/constants/errors.constants';
import { Role } from '../../entities/role.entity';
import { UserRoleEnum } from '../../shared/enum/user-roles.enum';
import { SearchUsersDto } from './dto/search-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    // check company campaign

    const newUser: UserEntity = new UserEntity(createUserDto);
    if (createUserDto.password) {
      newUser.password = await this.hashUserPass(createUserDto.password);
      newUser.emailActivated = true;
    }

    const roles = await this.roleRepository.find();

    if (!createUserDto.roleId) {
      newUser.roles = [roles.find(({ name }) => name === 'user')];
    } else {
      let role = roles.find(({ id }) => id === createUserDto.roleId);
      if (!role) role = roles.find(({ name }) => name === 'user');
      newUser.roles = [role];
    }

    try {
      await this.userRepository.save(newUser);
    } catch (e) {
      throw new BadRequestException(ERRORS_CONSTANTS.DB[e.code]('User'));
    }

    return newUser;
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  async updateUser(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const currentUser = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['companies', 'companies.campaigns', 'coupons', 'roles'],
    });

    const userUpdate = plainToClass(UserEntity, {
      ...currentUser,
      ...updateUserDto,
    });

    if (updateUserDto.password) {
      userUpdate.password = await this.hashUserPass(updateUserDto.password);
    }

    if (updateUserDto.roleId) {
      const roles = await this.roleRepository.find();
      let role = roles.find(({ id }) => id === updateUserDto.roleId);
      if (!role) role = roles.find(({ name }) => name === 'user');
      userUpdate.roles.push(role);
    }

    return this.userRepository.save(userUpdate);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of UserEntity
   */
  async findUsers(
    query: SearchUsersDto,
    user: UserEntity,
  ): Promise<UserEntity[]> {
    const currentUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['roles', 'companies'],
    });

    const where = {} as FindOptionsWhere<UserEntity>;

    return this.userRepository.find({
      where,
      relations: ['companies', 'companies.campaigns', 'coupons', 'roles'],
    });
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  public async hashUserPass(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async getByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }
}
