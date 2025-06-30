import { Livro } from '../domain/entities/livro.entity';

// Define uma interface para a estrutura de dados do Livro como ela aparece no banco de dados (persistência).
// Isso é útil porque o Prisma, por exemplo, gera seus próprios tipos.
// Por enquanto, usamos um tipo genérico que reflete as propriedades que esperamos.
interface LivroPersistence {
  id: number;
  titulo: string;
  isbn: string;
  genero: string;
  anoPublicacao: number;
  paginas: number;
  autorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class LivroMapper {
  /**
   * Converte um objeto de dados de persistência (vindo, por exemplo, do banco de dados)
   * para uma instância da Entidade de Domínio Livro.
   * @param rawData O objeto de dados brutos da persistência.
   * @returns Uma instância da Entidade de Domínio Livro.
   */
  public static toDomain(rawData: LivroPersistence | null): Livro | null {
    if (!rawData) {
      return null;
    }

    // Aqui, new Date() é usado para garantir que as propriedades de data sejam instâncias de Date,
    // caso venham como strings do banco de dados.
    return new Livro(
      rawData.titulo,
      rawData.isbn,
      rawData.genero,
      rawData.anoPublicacao,
      rawData.paginas,
      rawData.autorId,
      new Date(rawData.createdAt),
      new Date(rawData.updatedAt),
      rawData.id,
    );
  }

  /**
   * Converte uma instância da Entidade de Domínio Livro para um objeto plano
   * adequado para persistência no banco de dados.
   * @param livro A Entidade de Domínio Livro.
   * @returns Um objeto plano com os dados do livro, pronto para ser salvo.
   */
  public static toPersistence(livro: Livro): LivroPersistence {
    // Retorna um objeto que corresponde à estrutura esperada pelo ORM para salvar.
    // O ID pode ser opcional aqui se for uma criação nova.
    return {
      id: livro.id!, // Assumimos que o ID estará presente para persistência, ou será gerado.
      titulo: livro.titulo,
      isbn: livro.isbn,
      genero: livro.genero,
      anoPublicacao: livro.anoPublicacao,
      paginas: livro.paginas,
      autorId: livro.autorId,
      createdAt: livro.createdAt,
      updatedAt: livro.updatedAt,
    };
  }

  /**
   * Converte uma instância da Entidade de Domínio Livro para um DTO (Data Transfer Object)
   * a ser usado na camada de apresentação (API).
   * Note: Para este exemplo, o DTO é igual ao LivroPersistence, mas em cenários reais,
   * ele pode ter uma forma diferente (ex: remover campos sensíveis, adicionar campos calculados).
   * @param livro A Entidade de Domínio Livro.
   * @returns Um objeto DTO para ser exposto pela API.
   */
  // Usando LivroPersistence como DTO provisório
  public static toDTO(livro: Livro): LivroPersistence {
    return {
      id: livro.id!,
      titulo: livro.titulo,
      isbn: livro.isbn,
      genero: livro.genero,
      anoPublicacao: livro.anoPublicacao,
      paginas: livro.paginas,
      autorId: livro.autorId,
      createdAt: livro.createdAt,
      updatedAt: livro.updatedAt,
    };
  }
}
