import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import chalk from 'chalk'
import Debug from 'debug'

const debug = Debug('app:migration:users')

export class CreateUsers1551854442414 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    const TABLE = 'users'
    debug(`ALTER TABLE [${chalk.cyan(TABLE)}]`)
    let table = await queryRunner.getTable(TABLE)
    let columns = [
      {
        name: 'uuid',
        type: 'uuid',
        isUnique: true,
        default: `uuid_generate_v4()`
      },
      {
        name: 'first_name',
        type: 'varchar'
      },
      {
        name: 'last_name',
        type: 'varchar'
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true
      },
      {
        name: 'mobile',
        type: 'varchar',
        isUnique: true,
        isNullable: true
      },
      {
        name: 'created_at',
        type: 'timestamp with time zone',
        default: `now()`
      }
    ]

    // Add the cols
    columns.map(async col => {
      let _col = new TableColumn(col)
      await queryRunner.addColumn(table!, _col)
    })
  }

  public async down(): Promise<any> {
    // no-op
  }

}
