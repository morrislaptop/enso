import 'reflect-metadata'

import { App } from './App'
import { env } from './config/env'
// TODO: move to /config/container?
import { container } from './container'

(async () => {
  try {
    console.log('============================================')
    console.log('> Starting server...')
    console.log('============================================')

    const app = new App(env)
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
