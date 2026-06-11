import prisma from '../prisma/PrismaClient'
import { appExpress } from './appExpress'
import { env } from './env'
import { PrismaLogRepository } from './modules/logging/infra/PrismaLogRepository'
import { InMemoryEventBus } from './modules/shared/infra/InMemoryEventBus'
import { PrismaDeadLetterRepository } from './modules/shared/infra/PrismaDeadLetterRepository'
import { PrismaIdempotenciaRepository } from './modules/shared/infra/PrismaIdempotenciaRepository'
import { UuidGenerator } from './modules/shared/infra/UuidGenerator'
import { UserModule } from './modules/user/UserModule'

const eventBus = new InMemoryEventBus(new PrismaIdempotenciaRepository(prisma), new PrismaDeadLetterRepository(prisma))
const logRepository = new PrismaLogRepository()
const idGenerator = new UuidGenerator()

UserModule.inicializar(logRepository, eventBus, idGenerator)


appExpress.listen(env.PORT, () => {
  console.log(`HTTP Server running on port ${env.PORT}`)
})
