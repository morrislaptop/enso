import dotenv from 'dotenv-safe'

// TODO: Improve imports so it's clear that this is from typeorm
// eg. import { SnakeCaseNamingStrategy } from '@enso/typeorm'
import { SnakeCaseNamingStrategy } from '@enso/framework'

dotenv.load()
/**
 * https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#what-is-connectionoptions
 *
 * @type {ConnectionOptions}
 */
module.exports = {
  type: process.env.DB_TYPE,
  url: process.env.DB_CONNECTION_URL,
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeCaseNamingStrategy(),
  entities: [
    'src/entities/**/*.ts',
    'src/entities/index.ts'
  ],
  migrations: [
    'migrations/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'migrations'
  }
}
