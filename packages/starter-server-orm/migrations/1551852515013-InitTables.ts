import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import Debug from 'debug'

const debug = Debug('app:migrations')

/**
 * During development we can use this to quickly setup FK's
 */
const TABLES = [
  'user_roles',
  'users'
]

export class InitTables1551852515013 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<any> {
    debug('Setting up required tables...')
    return Promise.all(TABLES.map(async table => {
      await queryRunner.createTable(new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment'
          }
        ]
      }), true)
    }))
  }

  public async down (): Promise<any> {
    // no-op
  }
}
