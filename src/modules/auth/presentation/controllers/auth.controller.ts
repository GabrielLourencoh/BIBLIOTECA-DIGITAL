import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginAutorUseCase } from '../../application/use-cases/login-autor.use-case';
import { LoginDto } from '../dtos/inputs/login.dto';
import { LoginResponseDto } from '../dtos/outputs/login-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
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
}
