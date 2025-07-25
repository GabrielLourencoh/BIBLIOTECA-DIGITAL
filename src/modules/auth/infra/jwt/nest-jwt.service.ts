/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthPayloadEntity } from '../../domain/entities/auth-payload.entity';
import { JwtService as NestJwtService } from '@nestjs/jwt'; // Renomeia para evitar conflito
import { JwtService } from '../../domain/services/jwt.service';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class NestJwtServiceAdapter implements JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async sign(payload: AuthPayloadEntity): Promise<string> {
    const token = await this.nestJwtService.signAsync(
      { sub: payload.id, cpf: payload.cpf, nome: payload.nome },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );
    return token;
  }

  async verify(token: string): Promise<AuthPayloadEntity> {
    try {
      const decodedPayload = await this.nestJwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      // Mapeia o payload decodificado de volta para sua entidade de domínio (com CPF).

      return new AuthPayloadEntity(
        decodedPayload.sub,
        decodedPayload.cpf,
        decodedPayload.nome,
      );
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }
}
