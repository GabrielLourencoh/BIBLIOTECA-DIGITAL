export class AuthPayloadEntity {
  id: number;
  cpf: string;

  constructor(id: number, cpf: string) {
    this.id = id;
    this.cpf = cpf;
  }
}
