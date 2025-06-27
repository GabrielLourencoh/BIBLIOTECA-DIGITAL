export class Autor {
  // Propriedades
  id?: number;
  nome: string;
  cpf: string;
  nacionalidade: string;
  idade: number;
  createdAt: Date;
  updatedAt: Date;

  // Construtor -> Recebe os dados iniciais para criar uma instancia de Autor
  constructor(
    nome: string,
    cpf: string,
    nacionalidade: string,
    idade: number,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.nacionalidade = nacionalidade;
    this.idade = idade;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
