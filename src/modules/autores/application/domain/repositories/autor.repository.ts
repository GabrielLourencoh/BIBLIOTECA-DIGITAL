import { Autor } from '@prisma/client';
import { CreateAutorDto } from '../../presentation/dtos/inputs/create-autor.dto';
import { UpdateAutorDto } from '../../presentation/dtos/inputs/update-autor.dto';

/**
 * Esta é a interface que representa o contrato para qualquer repositório
 * A camada de aplicação (Use Cases) depende apenas desta interface.
 */
export abstract class AutorRepository {
  /**
   * Cria um novo autor a partir do DTO recebido.
   */
  abstract create(data: CreateAutorDto): Promise<Autor>;

  /**
   * Retorna todos os autores cadastrados, ordenados conforme necessário.
   */
  abstract findAll(): Promise<Autor[]>;

  /**
   * Retorna um único autor pelo seu ID.
   */
  abstract findOne(id: number): Promise<Autor | null>;

  /**
   * Atualiza um autor existente pelo ID com os dados fornecidos.
   */
  abstract update(id: number, data: UpdateAutorDto): Promise<Autor>;

  /**
   * Remove um autor com base no ID.
   */
  abstract remove(id: number): Promise<Autor>;
}
