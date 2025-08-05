-- CreateTable
CREATE TABLE "public"."Alojamiento" (
    "id" SERIAL NOT NULL,
    "anfitrionId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precioPorNoche" DOUBLE PRECISION NOT NULL,
    "moneda" INTEGER NOT NULL,
    "horarioCheckIn" TEXT NOT NULL,
    "horarioCheckOut" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,
    "cantHuespedesMax" INTEGER NOT NULL,

    CONSTRAINT "Alojamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pais" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ciudad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Ciudad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Direccion" (
    "id" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "altura" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "ciudadId" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Foto" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "alojamientoId" INTEGER NOT NULL,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Caracteristica" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Caracteristica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reserva" (
    "id" SERIAL NOT NULL,
    "fechaAlta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "huespedReservadorId" INTEGER NOT NULL,
    "cantidadHuespedes" INTEGER NOT NULL,
    "alojamientoId" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "estado" INTEGER NOT NULL,
    "precioPorNoche" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CambioEstadoReserva" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "reservaId" INTEGER NOT NULL,

    CONSTRAINT "CambioEstadoReserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_AlojamientoCaracteristicas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AlojamientoCaracteristicas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AlojamientoCaracteristicas_B_index" ON "public"."_AlojamientoCaracteristicas"("B");

-- AddForeignKey
ALTER TABLE "public"."Alojamiento" ADD CONSTRAINT "Alojamiento_anfitrionId_fkey" FOREIGN KEY ("anfitrionId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alojamiento" ADD CONSTRAINT "Alojamiento_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "public"."Direccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ciudad" ADD CONSTRAINT "Ciudad_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "public"."Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Direccion" ADD CONSTRAINT "Direccion_ciudadId_fkey" FOREIGN KEY ("ciudadId") REFERENCES "public"."Ciudad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Foto" ADD CONSTRAINT "Foto_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "public"."Alojamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_huespedReservadorId_fkey" FOREIGN KEY ("huespedReservadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "public"."Alojamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CambioEstadoReserva" ADD CONSTRAINT "CambioEstadoReserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CambioEstadoReserva" ADD CONSTRAINT "CambioEstadoReserva_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "public"."Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AlojamientoCaracteristicas" ADD CONSTRAINT "_AlojamientoCaracteristicas_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Alojamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_AlojamientoCaracteristicas" ADD CONSTRAINT "_AlojamientoCaracteristicas_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Caracteristica"("id") ON DELETE CASCADE ON UPDATE CASCADE;
