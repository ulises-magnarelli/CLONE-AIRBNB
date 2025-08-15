/*
  Warnings:

  - Made the column `updatedAt` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ALTER COLUMN "updatedAt" SET NOT NULL;
