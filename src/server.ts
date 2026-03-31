import { appExpress } from './appExpress'
import { env } from './env'
import { InMemoryEventBus } from './modules/shared/infra/InMemoryEventBus'
import { UserModule } from './modules/user/UserModule'

const eventBus = new InMemoryEventBus()

UserModule.inicializar(eventBus)


appExpress.listen(env.PORT, () => {
  console.log(`HTTP Server running on port ${env.PORT}`)
})
