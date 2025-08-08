-- CreateTable
CREATE TABLE "public"."Reseña" (
    "id" SERIAL NOT NULL,
    "comentario" TEXT NOT NULL,
    "puntuacion" DOUBLE PRECISION NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" INTEGER NOT NULL,
    "alojamientoId" INTEGER NOT NULL,

    CONSTRAINT "Reseña_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reseña" ADD CONSTRAINT "Reseña_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reseña" ADD CONSTRAINT "Reseña_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "public"."Alojamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
