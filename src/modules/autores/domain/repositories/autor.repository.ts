import { Autor } from '../entities/autor.entity';

export abstract class AutorRepository {
  abstract create(autor: Autor): Promise<Autor>;

  abstract findAll(): Promise<Autor[]>;

  abstract findOne(id: number): Promise<Autor | null>;

  abstract update(id: number, autor: Autor): Promise<Autor>;

  abstract remove(id: number): Promise<Autor>;

  abstract findByCpf(cpf: string): Promise<Autor | null>;
}
