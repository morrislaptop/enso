import 'reflect-metadata'

import { ServerAbstract } from './server/ServerAbstract'

// Interfaces
export * from './config/interfaces'
export * from './server/interfaces'

export * from './config/constants'

// recommended koa middleware
export * from './server/middleware'

// bindings
export * from './bindings'

// tests
export * from './tests'

// TODO: export vendor utility files under a nicer namespace
// ie. @enso/typeorm
export * from './vendors/typeorm/SnakeCaseNamingStrategy'

export {
  ServerAbstract
}
