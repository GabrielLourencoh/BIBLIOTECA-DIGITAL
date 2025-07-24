import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginAutorUseCase } from '../../application/use-cases/login-autor.use-case';
import { LoginDto } from '../dtos/inputs/login.dto';
import { LoginResponseDto } from '../dtos/outputs/login-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAutorUseCase: LoginAutorUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realizar login do autor' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiResponse({ status: 200, description: 'Login concluido' })
  @ApiResponse({ status: 401, description: 'Sem autorização' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const AuthTokenOutput = await this.loginAutorUseCase.execute(loginDto);

    return new LoginResponseDto(AuthTokenOutput.accessToken);
  }
}
