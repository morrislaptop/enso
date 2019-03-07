import 'reflect-metadata'

import { App } from './App'
import { env } from './config/env'
// TODO: move to /config/container?
import { container } from './container'
import { createConnection, Connection } from 'typeorm'

(async () => {
  try {
    console.log('============================================')
    console.log('> Starting server...')
    console.log('============================================')

    // Read in config
    console.log('> Starting database')
    const connectionOptions = await require('./../ormconfig')
    const connection = await createConnection(connectionOptions)

    // Bind Application-instance-specific values
    // container.bind<IEnvironmentConfig>($b.Environment).toConstantValue(env)
    container.bind<Connection>(Connection).toConstantValue(connection)


    const app = new App(env)
    await app.initiateDatabaseConnection(connectionOptions)
    await app.build(container)
    await app.start()

    console.log('')
    console.log('✔ [nodejs] %s', process.version)
    console.log('')
    console.log(
      '✔ API server listening on port %d in [%s] mode',
      env.PORT,
      env.ENVIRONMENT
    )
    // console.log('✔ API version %s', pkg.version)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
