-- CreateTable
CREATE TABLE "Cita" (
    "id" BIGSERIAL NOT NULL,
    "mascotaId" BIGINT NOT NULL,
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6),
    "description" VARCHAR,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "Mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
