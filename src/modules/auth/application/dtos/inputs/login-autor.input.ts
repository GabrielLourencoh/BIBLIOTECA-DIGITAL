export class LoginAutorInput {
  cpf: string;
  password: string;

  constructor(cpf: string, password: string) {
    this.cpf = cpf;
    this.password = password;
  }
}
