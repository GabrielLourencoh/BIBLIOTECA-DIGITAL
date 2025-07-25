export class AuthPayloadEntity {
  id: number;
  cpf: string;
  nome: string;

  constructor(id: number, cpf: string, nome: string) {
    this.id = id;
    this.cpf = cpf;
    this.nome = nome;
  }
}
