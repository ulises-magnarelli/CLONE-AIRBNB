/*
  Warnings:

  - You are about to drop the `Reseña` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Reseña" DROP CONSTRAINT "Reseña_alojamientoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reseña" DROP CONSTRAINT "Reseña_autorId_fkey";

-- DropTable
DROP TABLE "public"."Reseña";

-- CreateTable
CREATE TABLE "public"."Opinion" (
    "id" SERIAL NOT NULL,
    "comentario" TEXT NOT NULL,
    "puntuacion" DOUBLE PRECISION NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" INTEGER NOT NULL,
    "alojamientoId" INTEGER NOT NULL,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Opinion" ADD CONSTRAINT "Opinion_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Opinion" ADD CONSTRAINT "Opinion_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "public"."Alojamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
