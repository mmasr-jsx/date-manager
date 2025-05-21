/*
  Warnings:

  - Added the required column `last_name` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "last_name" VARCHAR NOT NULL;
