import { Autor } from '../entities/autor.entity';

/**
 * Esta é a interface que representa o contrato para qualquer repositório
 * A camada de aplicação (Use Cases) depende apenas desta interface.
 */
export abstract class AutorRepository {
  /**
   * Cria um novo autor a partir do DTO recebido.
   */
  abstract create(autor: Autor): Promise<Autor>;

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
  abstract update(id: number, autor: Autor): Promise<Autor>;

  /**
   * Remove um autor com base no ID.
   */
  abstract remove(id: number): Promise<Autor>;

  abstract findByCpf(cpf: string): Promise<Autor | null>;
}
