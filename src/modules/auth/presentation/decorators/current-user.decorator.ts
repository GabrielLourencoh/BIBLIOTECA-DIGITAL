import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify'; //
import { AUTH_PAYLOAD_KEY } from '../guards/auth.guard';
import { AuthPayloadEntity } from '../../domain/entities/auth-payload.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthPayloadEntity => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    // Retorna o payload que foi anexado à requisição pelo AuthGuard
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return (request as any)[AUTH_PAYLOAD_KEY];
  },
);
