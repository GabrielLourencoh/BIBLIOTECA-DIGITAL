import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Autor } from 'src/autores/entities/autor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  @IsString()
  titulo: string;

  @Column({ length: 13, unique: true, nullable: false }) // ISBN tem 10 ou 13 dígitos
  @IsString()
  isbn: string;

  @Column({ length: 40, nullable: false })
  @IsString()
  genero: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsPositive()
  anoPublicacao: number;

  @Column()
  @IsNumber()
  @IsPositive()
  paginas: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // --- RELAÇÃO: Um livro pertence a um autor ---
  @ManyToOne(
    () => Autor, // Entidade alvo: um Livro tem um único Autor
    (autor) => autor.livros, // Lado inverso: a propriedade 'livros' em Autor aponta de volta para Livro
    { onDelete: 'CASCADE' }, // para quando fort deletado um autor, esse livro tbm é deletado
  )
  @JoinColumn({ name: 'autorId' }) // Define a coluna 'autorId' como chave estrangeira nesta tabela
  autor: Autor; // Propriedade para carregar o objeto Autor completo

  @Column({ nullable: false }) // Coluna física para armazenar o ID do autor no banco de dados
  autorId: number; // Chave estrangeira que referencia a tabela Autor
}
