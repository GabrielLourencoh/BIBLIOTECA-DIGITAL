import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from 'src/autores/autores.module';
import { LivrosModule } from 'src/livros/livros.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432, // Porta padrao
    //   username: 'postgres', //usernamepadrao
    //   database: 'biblioteca_digital', //nome do banco
    //   password: '240024',
    //   autoLoadEntities: true, // Carrega entidades sem precisar especificá-las
    //   synchronize: true, // Sincroniza com o BD. Não deve ser usado em produção
    // }),
    PrismaModule,
    AutoresModule,
    LivrosModule,
  ],
})
export class AppModule {}
