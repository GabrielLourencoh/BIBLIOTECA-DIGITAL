import { Injectable } from '@nestjs/common';
import { HashingService } from '../../domain/services/hashing.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptHashService implements HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
