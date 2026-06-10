-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "TipoVinculo" AS ENUM ('PAI', 'MAE', 'PARENTE', 'CONHECIDO', 'TRANSPORTE');

-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PROCESSING', 'PROCESSED', 'FAILED', 'DLQ');

-- CreateTable
CREATE TABLE "alunos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "informacoes" TEXT,
    "medicamentos" TEXT,
    "religiao" TEXT,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fichas" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "descontoPercentual" DOUBLE PRECISION,
    "descontoFixo" DOUBLE PRECISION,
    "diasDaSemana" "DiaSemana"[],
    "responsavelFinanceiroId" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complemento" TEXT,
    "serie" TEXT NOT NULL,
    "escola" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),

    CONSTRAINT "fichas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chamadas" (
    "alunoId" TEXT NOT NULL,
    "turno" "Turno" NOT NULL,
    "presenca" BOOLEAN NOT NULL,
    "data" DATE NOT NULL,

    CONSTRAINT "chamadas_pkey" PRIMARY KEY ("alunoId","data","turno")
);

-- CreateTable
CREATE TABLE "diarias" (
    "valor" DOUBLE PRECISION NOT NULL,
    "alunoId" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "turno" "Turno" NOT NULL,

    CONSTRAINT "diarias_pkey" PRIMARY KEY ("alunoId","data","turno")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "frequenciaSemanal" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "almoco" BOOLEAN NOT NULL,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "turno" "Turno" NOT NULL,
    "idadeMinima" DOUBLE PRECISION,
    "idadeMaxima" DOUBLE PRECISION,
    "capacidade" INTEGER,
    "professorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vinculos" (
    "alunoId" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "tipo" "TipoVinculo" NOT NULL,
    "buscaAutorizada" BOOLEAN NOT NULL,
    "contatoEmergencia" BOOLEAN NOT NULL,

    CONSTRAINT "vinculos_pkey" PRIMARY KEY ("alunoId","responsavelId")
);

-- CreateTable
CREATE TABLE "responsaveis" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "trabalho" TEXT,
    "funcao" TEXT,

    CONSTRAINT "responsaveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsaveis_financeiros" (
    "id" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complemento" TEXT,
    "metodoPagamento" TEXT NOT NULL,

    CONSTRAINT "responsaveis_financeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "nome" TEXT NOT NULL,
    "nomeDeUsuario" TEXT,
    "fotoUrl" TEXT,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "permissoes" TEXT[],
    "tipo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ultimoLogin" TIMESTAMP(3),
    "vistoPorUltimo" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "userResponsavelId" TEXT NOT NULL,
    "userCriadorId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dataAgendada" TIMESTAMP(3),
    "dataExecutada" TIMESTAMP(3),

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_eventos" (
    "id" TEXT NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "dataOcorrencia" TIMESTAMP(3) NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "dados" JSONB NOT NULL,
    "moduloOrigem" TEXT NOT NULL,
    "dataPersistencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbox" (
    "id" TEXT NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "dataOcorrencia" TIMESTAMP(3) NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "dados" JSONB NOT NULL,
    "moduloOrigem" TEXT NOT NULL,
    "dataPersistencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "OutboxStatus" NOT NULL DEFAULT 'PENDING',
    "retries" INTEGER NOT NULL DEFAULT 0,
    "processedAt" TIMESTAMP(3),
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,
    "error" TEXT,
    "dlqAt" TIMESTAMP(3),

    CONSTRAINT "outbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_processados" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "handlerName" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checksum" TEXT,

    CONSTRAINT "eventos_processados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dead_letters" (
    "id" TEXT NOT NULL,
    "outboxId" TEXT NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "dados" JSONB NOT NULL,
    "dataOcorrencia" TIMESTAMP(3) NOT NULL,
    "moduloOrigem" TEXT NOT NULL,
    "errorHistory" JSONB NOT NULL,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retriesTotal" INTEGER NOT NULL,
    "reprocessado" BOOLEAN NOT NULL DEFAULT false,
    "reprocessadoAt" TIMESTAMP(3),

    CONSTRAINT "dead_letters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alunos_ativo_idx" ON "alunos"("ativo");

-- CreateIndex
CREATE INDEX "fichas_alunoId_idx" ON "fichas"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "responsaveis_cpf_key" ON "responsaveis"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "responsaveis_financeiros_responsavelId_key" ON "responsaveis_financeiros"("responsavelId");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "tarefas_userResponsavelId_idx" ON "tarefas"("userResponsavelId");

-- CreateIndex
CREATE INDEX "tarefas_userCriadorId_idx" ON "tarefas"("userCriadorId");

-- CreateIndex
CREATE INDEX "logs_eventos_nomeEvento_idx" ON "logs_eventos"("nomeEvento");

-- CreateIndex
CREATE INDEX "logs_eventos_aggregateId_idx" ON "logs_eventos"("aggregateId");

-- CreateIndex
CREATE INDEX "logs_eventos_dataOcorrencia_idx" ON "logs_eventos"("dataOcorrencia");

-- CreateIndex
CREATE INDEX "outbox_status_dataPersistencia_idx" ON "outbox"("status", "dataPersistencia");

-- CreateIndex
CREATE INDEX "outbox_lockedAt_idx" ON "outbox"("lockedAt");

-- CreateIndex
CREATE INDEX "outbox_dlqAt_idx" ON "outbox"("dlqAt");

-- CreateIndex
CREATE INDEX "eventos_processados_processedAt_idx" ON "eventos_processados"("processedAt");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_processados_eventId_handlerName_key" ON "eventos_processados"("eventId", "handlerName");

-- CreateIndex
CREATE INDEX "dead_letters_nomeEvento_idx" ON "dead_letters"("nomeEvento");

-- CreateIndex
CREATE INDEX "dead_letters_aggregateId_idx" ON "dead_letters"("aggregateId");

-- CreateIndex
CREATE INDEX "dead_letters_failedAt_idx" ON "dead_letters"("failedAt");

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas" ADD CONSTRAINT "fichas_responsavelFinanceiroId_fkey" FOREIGN KEY ("responsavelFinanceiroId") REFERENCES "responsaveis_financeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chamadas" ADD CONSTRAINT "chamadas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diarias" ADD CONSTRAINT "diarias_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vinculos" ADD CONSTRAINT "vinculos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vinculos" ADD CONSTRAINT "vinculos_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsaveis_financeiros" ADD CONSTRAINT "responsaveis_financeiros_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "responsaveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userResponsavelId_fkey" FOREIGN KEY ("userResponsavelId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userCriadorId_fkey" FOREIGN KEY ("userCriadorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
