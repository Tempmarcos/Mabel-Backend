import * as fs from 'node:fs';
import * as path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { PrismaPGlite } from 'pglite-prisma-adapter';
import { PrismaClient } from '../../../generated/prisma/client';

export interface TestDatabase {
  db: PrismaClient;
  client: PGlite;
  cleanup: () => Promise<void>;
  close: () => Promise<void>;
}

export async function createTestDatabase(): Promise<TestDatabase> {
  const client = new PGlite();
  // Apply migrations from the migrations folder
  const migrationsDir = path.resolve(
    process.cwd(),
    'prisma',
    'migrations',
  );
  const migrations = fs
    .readdirSync(migrationsDir)
    .filter((dir) => fs.statSync(path.join(migrationsDir, dir)).isDirectory())
    .sort();
  for (const migration of migrations) {
    const sqlPath = path.join(migrationsDir, migration, 'migration.sql');
    if (fs.existsSync(sqlPath)) {
      const sql = fs.readFileSync(sqlPath, 'utf-8');
      await client.exec(sql);
    }
  }
  const adapter = new PrismaPGlite(client);
  const db = new PrismaClient({ adapter });
  await db.$connect();
  return {
    db,
    client,
    async cleanup() {
      // Truncate all tables in dependency order
      await client.exec(`
        TRUNCATE TABLE alunos CASCADE;
        TRUNCATE TABLE fichas CASCADE;
        TRUNCATE TABLE chamadas CASCADE;
        TRUNCATE TABLE diarias CASCADE;
        TRUNCATE TABLE planos CASCADE;
        TRUNCATE TABLE turmas CASCADE;
        TRUNCATE TABLE vinculos CASCADE;
        TRUNCATE TABLE responsaveis CASCADE;
        TRUNCATE TABLE responsaveis_financeiros CASCADE;
        TRUNCATE TABLE usuarios CASCADE;
        TRUNCATE TABLE tarefas CASCADE;
        TRUNCATE TABLE logs_eventos CASCADE;
        TRUNCATE TABLE outbox CASCADE;
        TRUNCATE TABLE eventos_processados CASCADE;
        TRUNCATE TABLE dead_letters CASCADE;
      `);
    },
    async close() {
      await db.$disconnect();
      await client.close();
    },
  };
}
export function createTestId(id: string): string {
  return `test_${id}_${Date.now()}`;
}