import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtService } from '../../domain/services/jwt.service';
import { AuthPayloadEntity } from '../../domain/entities/auth-payload.entity';

// Constante para a chave onde o payload será armazenado na requisição
export const AUTH_PAYLOAD_KEY = 'authPayload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtém o objeto de requisição Fastify
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    try {
      const payload: AuthPayloadEntity = await this.jwtService.verify(token);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (request as any)[AUTH_PAYLOAD_KEY] = payload;
    } catch (error) {
      console.error('Falha na validação do token JWT:', error);
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
