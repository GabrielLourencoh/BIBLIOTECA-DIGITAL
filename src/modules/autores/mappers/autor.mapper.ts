// Importa o modelo Autor gerado pelo Prisma e 'apelida' de PrismaAutor
import { Autor as PrismaAutor } from '@prisma/client';
// Importa a entidade de Dominio Autor e 'aplida' de DomainAutor
import { Autor as DomainAutor } from '../domain/entities/autor.entity';

export class AutorMapper {
  /**
   * Converte um Modelo Autor do Prisma para uma Entidade de Domínio Autor.
   * @param prismaAutor O objeto Autor vindo do Prisma.
   * @returns Uma instância da Entidade de Domínio Autor.
   */
  static toDomain(prismaAutor: PrismaAutor | null): DomainAutor | null {
    if (!prismaAutor) {
      return null;
    }

    return new DomainAutor(
      prismaAutor.nome,
      prismaAutor.password,
      prismaAutor.cpf,
      prismaAutor.nacionalidade,
      prismaAutor.idade,
      prismaAutor.createdAt,
      prismaAutor.updatedAt,
      prismaAutor.id,
    );
  }

  /**
   * Converte uma Entidade de Domínio Autor para um objeto que pode ser persistido pelo Prisma.
   * @param domainAutor A Entidade de Domínio Autor.
   * @returns Um objeto compatível com o tipo de input do Prisma.
   */
  static toPersistence(domainAutor: DomainAutor): PrismaAutor {
    return {
      id: domainAutor.id,
      nome: domainAutor.nome,
      password: domainAutor.password,
      cpf: domainAutor.cpf,
      nacionalidade: domainAutor.nacionalidade,
      idade: domainAutor.idade,
      createdAt: domainAutor.createdAt,
      updatedAt: domainAutor.updatedAt,
    } as PrismaAutor;
  }
}
