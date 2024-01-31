import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from './types/jwtPayload.interface';
import { UserEntity } from '../../entities/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_JWT_SECRET,
      ignoreExpiration: process.env.NODE_ENV === 'development',
    });
  }

  async validate(payload: IJwtPayload): Promise<UserEntity> {
    const { email } = payload;
    const user = await this.usersService.getByEmail(email);
    if (typeof user === 'object' && user !== null) {
      if (!user.emailActivated) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }

    return user;
  }
}
