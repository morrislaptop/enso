import 'reflect-metadata'

import { App } from './App'
// const pkg = require('../starter-api-server/package.json')
import { env } from './config/env'
import { container } from './config/registry'

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