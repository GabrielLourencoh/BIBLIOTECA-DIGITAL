import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../../domain/services/hashing.service';
import { JwtService } from '../../domain/services/jwt.service';
import { AutorRepository } from 'src/modules/autores/domain/repositories/autor.repository';
import { LoginAutorInput } from '../dtos/inputs/login-autor.input';
import { AuthTokenOutput } from '../dtos/outputs/auth-token.output';
import { AuthPayloadEntity } from '../../domain/entities/auth-payload.entity';

@Injectable()
export class LoginAutorUseCase {
  constructor(
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly autorRepository: AutorRepository,
  ) {}

  async execute(input: LoginAutorInput): Promise<AuthTokenOutput> {
    const autor = await this.autorRepository.findByCpf(input.cpf);

    if (!autor) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordIsValid = await this.hashingService.compare(
      input.password,
      autor.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = new AuthPayloadEntity(autor.id!, autor.cpf, autor.nome);
    const accessToken = await this.jwtService.sign(payload);

    return new AuthTokenOutput(accessToken);
  }
}
