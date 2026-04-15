import { appExpress } from './appExpress'
import { env } from './env'
import { PrismaLogRepository } from './modules/logging/infra/PrismaLogRepository'
import { InMemoryEventBus } from './modules/shared/infra/InMemoryEventBus'
import { UuidGenerator } from './modules/shared/infra/UuidGenerator'
import { UserModule } from './modules/user/UserModule'

const eventBus = new InMemoryEventBus()
const logRepository = new PrismaLogRepository()
const idGenerator = new UuidGenerator()

UserModule.inicializar(logRepository, eventBus, idGenerator)


appExpress.listen(env.PORT, () => {
  console.log(`HTTP Server running on port ${env.PORT}`)
})
