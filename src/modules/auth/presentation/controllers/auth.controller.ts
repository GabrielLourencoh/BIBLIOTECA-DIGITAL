import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginAutorUseCase } from '../../application/use-cases/login-autor.use-case';
import { LoginDto } from '../dtos/inputs/login.dto';
import { LoginResponseDto } from '../dtos/outputs/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAutorUseCase: LoginAutorUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const AuthTokenOutput = await this.loginAutorUseCase.execute(loginDto);

    return new LoginResponseDto(AuthTokenOutput.accessToken);
  }
}
