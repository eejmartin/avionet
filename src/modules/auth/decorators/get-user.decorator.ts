import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../../entities/user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): UserEntity => {
    const user = context.switchToHttp().getRequest().user;
    return user;
  },
);
