-- CreateTable
CREATE TABLE "Usuario" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "rol" VARCHAR NOT NULL,
    "mail" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "phone" DECIMAL NOT NULL,
    "petId" BIGINT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mascotas" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "ownerId" BIGINT NOT NULL,
    "phone" DECIMAL NOT NULL,
    "breed" VARCHAR,
    "prize" SMALLINT,
    "size" VARCHAR,
    "warning" BOOLEAN,
    "description" TEXT,

    CONSTRAINT "Mascotas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_mail_key" ON "Usuario"("mail");

-- AddForeignKey
ALTER TABLE "Mascotas" ADD CONSTRAINT "Mascotas_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
