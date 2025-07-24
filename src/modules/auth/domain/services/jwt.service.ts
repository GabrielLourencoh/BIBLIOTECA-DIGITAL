import { AuthPayloadEntity } from '../entities/auth-payload.entity';

export abstract class JwtService {
  abstract sign(payload: AuthPayloadEntity): Promise<string>;

  abstract verify(token: string): Promise<AuthPayloadEntity>;
}
