import { Global, Module } from '@nestjs/common';
import { HashingService } from './domain/services/hashing.service';
import { BcryptHashService } from './infra/bcrypt/bcrypt-hash.service';

@Global()
@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHashService,
    },
  ],
  exports: [HashingService],
})
export class AuthModule {}
