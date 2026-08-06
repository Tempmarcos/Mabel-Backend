-- CreateTable
CREATE TABLE "materiais_ficha" (
    "id" TEXT NOT NULL,
    "fichaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "quantidadeEsperada" INTEGER NOT NULL,
    "quantidadeEntregue" INTEGER NOT NULL DEFAULT 0,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materiais_ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materiais_turma" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "quantidade" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "materiais_turma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "materiais_turma_turmaId_idx" ON "materiais_turma"("turmaId");

-- AddForeignKey
ALTER TABLE "materiais_ficha" ADD CONSTRAINT "materiais_ficha_fichaId_fkey" FOREIGN KEY ("fichaId") REFERENCES "fichas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiais_turma" ADD CONSTRAINT "materiais_turma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
