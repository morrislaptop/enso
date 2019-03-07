import { MigrationInterface, QueryRunner } from 'typeorm'
// import Debug from 'debug'
// const debug = Debug('app:migrations')

const EXTENSIONS = [
  'uuid-ossp'     // Allows the database to generate a uuid.v4 natively
]

export class InitExtentions1551852590484 implements MigrationInterface {

public async up (queryRunner: QueryRunner): Promise<any> {
    Promise.all(EXTENSIONS.map(async ext => {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "${ext}"`)
    }))
  }

  public async down (): Promise<any> {
    // no-op
  }
}
