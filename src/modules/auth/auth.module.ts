import { Global, Module } from '@nestjs/common';
import { HashingService } from './domain/services/hashing.service';
import { BcryptHashService } from './infra/bcrypt/bcrypt-hash.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './infra/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AutoresModule } from '../autores/autores.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtService } from './domain/services/jwt.service';
import { NestJwtServiceAdapter } from './infra/jwt/nest-jwt.service';
import { AuthGuard } from './presentation/guards/auth.guard';
import { LoginAutorUseCase } from './application/use-cases/login-autor.use-case';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.jwtTtl'),
          audience: configService.get<string>('jwt.audience'),
          issuer: configService.get<string>('jwt.issuer'),
        },
      }),
      inject: [ConfigService],
    }),
    AutoresModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginAutorUseCase,
    {
      provide: HashingService,
      useClass: BcryptHashService,
    },
    {
      provide: JwtService,
      useClass: NestJwtServiceAdapter,
    },
    AuthGuard,
  ],
  exports: [HashingService, JwtService, AuthGuard],
})
export class AuthModule {}
