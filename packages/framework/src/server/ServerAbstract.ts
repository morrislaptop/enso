import Koa from 'koa'
import http from 'http'
import { Container } from 'inversify'
import { InversifyKoaServer } from 'inversify-koa'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { Server } from 'http'
import Debug from 'debug'

import { IEnvironmentConfig } from '../config/interfaces'
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

const debug = Debug('enso:Server')

export abstract class ServerAbstract {

  /**
   * Instance of Koa
   */
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

  /**
   * Force the User to define how middleware is implemented
   *
   * @param koa
   * @param container
   */
  abstract applyMiddleware (koa: Koa, container: Container): void

  private async initialiseKoa (container: Container): Promise<Koa> {
    const koa = new InversifyKoaServer(container)

    debug('listRegisteredControllers()')
    try {
      const controllers = container.getAll(Symbol.for('Controller'))
      debug(` => \n`, controllers.map(c => Object.keys(c)))
    } catch (err) {
      debug(' => No controllers found', err)
    }

    debug('listRegisteredWebSockets()')
    try {
      const websockets = container.getAll(Symbol.for('WebSocketController'))
      debug(` => \n`, websockets)
    } catch {
      debug(' => No WebSocketController found')
    }

    koa.setConfig(koa => this.applyMiddleware(koa, container))
    return koa.build()
  }

  async initiateDatabaseConnection (connectionOptions: ConnectionOptions): Promise<Connection> {
    this.connection = await createConnection({
      ...connectionOptions
      // logging: false
    })
    return this.connection
  }

  async build (container: Container): Promise<void> {
    // koa
    this.koa = await this.initialiseKoa(container)
    this.isReady = true
  }

  /**
   * Return an instance of the IoC container
   */
  getInjectionContainer (): Container {
    return this.container
  }

  async start (): Promise<http.Server> {
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
