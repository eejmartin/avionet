import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.APP_JWT_SECRET,
  signOptions: {
    expiresIn: process.env.APP_JWT_EXPIRES_IN,
  },
}));
