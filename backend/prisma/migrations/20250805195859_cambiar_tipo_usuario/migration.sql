/*
  Warnings:

  - Changed the type of `tipo` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "tipo",
ADD COLUMN     "tipo" INTEGER NOT NULL;
