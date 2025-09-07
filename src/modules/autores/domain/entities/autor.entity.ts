import { HashingService } from '@/modules/auth/domain/services/hashing.service';
import { CreateAutorDto } from '@/modules/autores/presentation/dtos/inputs/create-autor.dto';
import { UpdateAutorDto } from '@/modules/autores/presentation/dtos/inputs/update-autor.dto';

export class Autor {
  id?: number;
  nome: string;
  password: string;
  cpf: string;
  nacionalidade: string;
  idade: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    nome: string,
    password: string,
    cpf: string,
    nacionalidade: string,
    idade: number,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.password = password;
    this.cpf = cpf;
    this.nacionalidade = nacionalidade;
    this.idade = idade;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create(
    data: CreateAutorDto,
    hashingService: HashingService,
  ): Promise<Autor> {
    const hashedPassword = await hashingService.hash(data.password);

    return new Autor(
      data.nome,
      hashedPassword,
      data.cpf,
      data.nacionalidade,
      data.idade,
      new Date(),
      new Date(),
    );
  }

  async update(
    updateAutordto: UpdateAutorDto,
    hashingService: HashingService,
  ): Promise<void> {
    if (updateAutordto.nome) {
      this.nome = updateAutordto.nome;
    }

    if (updateAutordto.password) {
      this.password = await hashingService.hash(updateAutordto.password);
    }

    if (updateAutordto.cpf) {
      this.cpf = updateAutordto.cpf;
    }

    if (updateAutordto.nacionalidade) {
      this.nacionalidade = updateAutordto.nacionalidade;
    }

    if (updateAutordto.idade) {
      this.idade = updateAutordto.idade;
    }

    this.updatedAt = new Date();
  }
}
