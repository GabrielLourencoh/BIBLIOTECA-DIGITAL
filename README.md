# Biblioteca Digital

Repositório da API da Biblioteca Digital

## 💻 Tecnologias principais:

* <b>NestJS:</b> Framework progressivo para Node.js, utilizado para construir a arquitetura da API backend.

* <b>TypeScript:</b> Linguagem de programação que adiciona tipagem estática e segurança ao JavaScript.

* <b>Prisma ORM:</b> Banco de dados relacional robusto onde os dados da aplicação são armazenados.

* <b>Fastify:</b> Adaptador HTTP para o NestJS, focado em alta performance e eficiência.

* <b>Pnpm:</b> Gerenciador de pacotes rápido e eficiente para gerenciamento das dependências do projeto.

* <b>Zod:</b> Biblioteca utilizada para validação de schemas de dados e variáveis de ambiente.

* <b>ESLint:</b> Ferramenta de linting para manter a qualidade do código e padronizar o estilo.

* <b>Swagger:</b> Usado para gerar e servir a documentação interativa da API.

* <b>JWT (JSON Web Tokens):</b> Para autenticação e autorização seguras na API.

* <b>Bcryptjs:</b> Biblioteca para hash de senhas de forma segura.

## 💡 Útil

<details>
  <summary>Instalando o pnpm</summary>

  Caso não tenha o gerenciador de pacotes [pnpm](https://pnpm.io/pt) instalado na sua máquina, recomendo que instale:

  ```bash
  npm install -g pnpm
  ```

</details>

## 📦 Como rodar o projeto localmente?

Siga os passos abaixo para configurar e rodar o projeto localmente:

### 1. Clone o repositório e acesse a pasta gerada

```bash
git clone https://github.com/GabrielLourencoh/BIBLIOTECA-DIGITAL

cd BIBLIOTECA-DIGITAL
```

### 2. Instale as dependências

Após clonar o repositório, instale todas as dependências do projeto:

```bash
pnpm install
```

### 3. Copie e cole o ".env.example" alterando o nome para ".env"

Copie o arquivo .env.example para .env e preencha as variáveis de acordo com suas necessidades.

```bash
cp .env.example .env
```

### 4. Configure o seu .env de acordo com suas necessidades

#### Exemplo:

```bash
# APP
APP_NAME=biblioteca_digital # Nome da aplicação
APP_URL=localhost:3000 # URL da aplicação
APP_ENV=dev # Área em que o projeto está, exemplo: dev, prod...
APP_PORT=3000 # Porta da aplicação

# DATABASE
DATABASE_URL="postgresql://postgres:123456@localhost:5432/meu_banco?schema=public" # URL do banco de dados

# JWT
JWT_SECRET=sua_chave_secreta # Chave secreta
JWT_TTL=3600 # Tempo de vida do token, em segundos
JWT_AUDIENCE=http://localhost:3000 # Onde está gerando o token
JWT_ISSUER=http://localhost:3000 # Quem está gerando 
```

### 5. Configure o banco de dados

Certifique-se de que seu banco de dados esteja rodando. Em seguida, aplique as migrações do Prisma para criar o schema do banco de dados:

```bash
npx prisma migrate deploy
```

### 6. Inicie a aplicação em desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento:

```bash
pnpm run start:dev
```
A API estará disponível em: http://localhost:3000
<br>Documentação Swagger em: http://localhost:3000/api

## 🚀 Como rodar o projeto em produção? 

### 1. Build do projeto

Compile o projeto para gerar os arquivos JavaScript otimizados para produção:

```bash
pnpm run build
```

### 2. Configure as variáveis de ambiente

Certifique-se de que o arquivo .env esteja configurado com as variáveis de ambiente como explicado anteriormente.

### 3. Inicie a aplicação em produção

Após o build, inicie a aplicação em modo de produção:

```bash
pnpm run start:prod
```

## 📋 Comandos disponíveis:

* ```pnpm install```: Instala todas as dependências do projeto.

* ```pnpm run start:dev```: Inicia a aplicação em modo de desenvolvimento.

* ```pnpm run start:prod```: Inicia a aplicação em modo de produção.

* ```pnpm run build```: Compila o projeto para produção.

* ```pnpm run lint```: Executa o linter para verificar problemas de estilo e erros no código.

* ```pnpm run format```: Formata o código usando Prettier/ESLint.

* ```pnpm run test```: Executa os testes unitários e de integração.

* ```npx prisma generate```: Gera o Prisma Client com base no schema.prisma.

* ```npx prisma migrate dev```: Cria e aplica migrações do banco de dados.

* ```npx prisma studio```: Abre a interface gráfica do Prisma para visualizar e gerenciar dados.