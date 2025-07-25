import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthPayloadEntity } from '../../domain/entities/auth-payload.entity';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class ProfileController {
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retorna o perfil do autor autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Perfil do autor retornado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token inválido ou expirado',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  getProfile(@CurrentUser() payload: AuthPayloadEntity) {
    return {
      message: 'Acesso permitido ao perfil do autor',
      autor: {
        id: payload.id,
        nome: payload.nome,
      },
    };
  }
}
