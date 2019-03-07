import { Container } from 'inversify'
import { interfaces, TYPE } from 'inversify-koa'
import { useContainer } from 'class-validator'

import { $b } from './bindings'
import { IUserFactory, IUserRepository } from './classes/users/interfaces'

import { IndexController } from './IndexController'
import { UsersController } from './classes/users/UsersController'

import { UserFactory } from './classes/users/UserFactory'

import { UserRepository } from './classes/users/UserRepository'


/**
 * Controllers
 */
const container = new Container()

container.bind<interfaces.Controller>(TYPE.Controller).to(IndexController).whenTargetNamed('IndexController')

container.bind<interfaces.Controller>(TYPE.Controller).to(UsersController).whenTargetNamed('UsersController')

/**
 * Factories
 */
container.bind<IUserFactory>(UserFactory).toSelf()

/**
 * Repositories
 */
container.bind<IUserRepository>($b.UserRepository).to(UserRepository)

/**
 * Services
 */
// TODO

// Register the container with the [class-validator] package
// https://github.com/typestack/class-validator#using-service-container
useContainer(container, { fallback: true, fallbackOnErrors: true })

export {
  container
}
