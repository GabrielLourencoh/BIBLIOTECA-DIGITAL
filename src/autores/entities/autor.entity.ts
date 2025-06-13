/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Livro } from '../../livros/entities/livro.entity';

@Entity() // Sinalizando que é uma entity do banco de dados
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  @IsString()
  nome: string;

  @Column({ length: 50 })
  @IsString()
  nacionalidade: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsPositive()
  @Min(18)
  idade: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // --- RELAÇÃO: Um autor tem muitos livros ---
  @OneToMany(
    () => Livro, // Entidade alvo: um Autor tem múltiplos Livros
    (livro) => livro.autor, // Lado inverso: a propriedade 'autor' em Livro aponta de volta para Autor
  )
  livros: Livro[]; // Coleção de livros que pertencem a este autor
}
