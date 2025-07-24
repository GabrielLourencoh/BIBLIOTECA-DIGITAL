import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginAutorUseCase } from '../../application/use-cases/login-autor.use-case';
import { LoginDto } from '../dtos/inputs/login.dto';
import { LoginResponseDto } from '../dtos/outputs/login-response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthPayloadEntity } from '../../domain/entities/auth-payload.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAutorUseCase: LoginAutorUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realiza o login de um autor e retorna um token JWT',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Sem autorização - Credenciais inválidas',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const AuthTokenOutput = await this.loginAutorUseCase.execute(loginDto);

    return new LoginResponseDto(AuthTokenOutput.accessToken);
  }

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
      message: 'Acesso permitido ao perfil do autor!',
      autor: {
        id: payload.id,
        cpf: payload.cpf,
      },
    };
  }
}
