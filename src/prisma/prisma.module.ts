import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Este decorador é importante se quiser que o módulo seja global
@Module({
  providers: [PrismaService], // Aqui você declara o serviço que este módulo provê
  exports: [PrismaService], // Aqui você exporta o serviço para que outros módulos possam usá-lo
})
export class PrismaModule {} // O nome da classe deve ser 'PrismaModule'
