import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  jwtTtl: Number(process.env.JWT_TTL || '3600'),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
}));
