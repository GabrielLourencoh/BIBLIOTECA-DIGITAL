/*
  Warnings:

  - Made the column `password` on table `Autor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Autor" ALTER COLUMN "password" SET NOT NULL;
