import Koa from 'koa'
import { Container } from 'inversify'
import { InversifyKoaServer } from 'inversify-koa'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { Server } from 'http'
import Debug from 'debug'

import { IEnvironmentConfig } from '../config/interfaces'
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import { $b } from '../bindings';

const debug = Debug('enso:Server')

export abstract class ServerAbstract {

  koa: Koa

  connection: Connection

  server: Server

  container: Container

  connectionOptions?: ConnectionOptions | PostgresConnectionCredentialsOptions

  /**
   * Server is ready to be started
   */
  isReady: boolean = false

  constructor (
    public env: IEnvironmentConfig
  ) {}

  abstract applyMiddleware (koa: Koa, container: Container): void

  private async initialiseKoa (container: Container): Promise<Koa> {
    const controllers = container.getAll(Symbol.for('Controller'))
    const koa = new InversifyKoaServer(container)

    debug('registerdControllers()', controllers)

    koa.setConfig(koa => this.applyMiddleware(koa, container))
    return koa.build()
  }

  private async initiateDatabaseConnection (connectionOptions: ConnectionOptions): Promise<Connection> {
    this.connection = await createConnection({
      ...connectionOptions
      // logging: false
    })
    return this.connection
  }

  async build (container: Container, connectionOptions?: ConnectionOptions): Promise<void> {
    // create the default connection
    if (connectionOptions) {
      this.connectionOptions = connectionOptions
      this.connection = await this.initiateDatabaseConnection(connectionOptions)
    }

    container = await this.bindConstants(container)

    // koa
    this.koa = await this.initialiseKoa(container)

    this.isReady = true
  }

  async bindConstants (container: Container) {
    if (this.connection) {
      container.bind<Connection>($b.Connection).toConstantValue(this.connection)
    }
    container.bind<IEnvironmentConfig>($b.Environment).toConstantValue(this.env)
    return container
  }

  /**
   * Return an instance of the IoC container
   */
  getInjectionContainer (): Container {
    return this.container
  }

  async start () {
    this.server = await this.koa.listen(this.env.PORT)
    return this.server
  }

  async stop () {
    if (this.server) {
      this.server.close()
    }
    if (this.connection) {
      this.connection.close()
    }
  }
}
