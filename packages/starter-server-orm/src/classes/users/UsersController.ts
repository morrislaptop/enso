import { injectable, inject } from 'inversify'
import { controller, interfaces, httpGet, httpPost } from 'inversify-koa'
import Router from 'koa-router'
import { transformAndValidate } from 'class-transformer-validator'

import { IUserRepository } from './interfaces'
import { $b } from '../../bindings'
import { UserFactory } from './UserFactory'
import { serialiseUserReponse } from './transforms'
import { RegisterUserRequest } from './requests'

@injectable()
@controller('/api/users')
export class UsersController implements interfaces.Controller {

  constructor (
    private factory: UserFactory,
    @inject($b.UserRepository) private users: IUserRepository
  ) {}

  /**
   * GET /api/users
   */
  @httpGet('/')
  async listUsers (ctx: Router.IRouterContext) {
    // find
    const users = await this.users.repo.find()

    // response
    ctx.status = 200
    ctx.body = {
      message: 'ok',
      data: users.map(user => serialiseUserReponse(user))
    }
  }

  /**
   * GET /api/users/:uuid
   */
  @httpGet('/:uuid')
  async viewUser (ctx: Router.IRouterContext) {
    // find
    const user = await this.users.browseByUuid(ctx.params.uuid)

    // response
    ctx.status = 200
    ctx.body = {
      message: 'ok',
      data: serialiseUserReponse(user)
    }
  }

  /**
   * POST /api/users/register
   */
  @httpPost('/register')
  async registerUser (ctx: Router.IRouterContext) {
    // validate
    const data = await transformAndValidate(RegisterUserRequest, ctx.request.body as object)

    // register
    const userNotification = await this.factory.makeUser(data)

    // response
    ctx.status = 200
    ctx.body = {
      message: 'ok',
      data: userNotification
    }
  }
}
