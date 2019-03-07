import { injectable } from 'inversify'
import { interfaces, controller, httpGet } from 'inversify-koa'
import * as Router from 'koa-router'

const pkg = require('../package.json')

@injectable()
@controller('/')
export class IndexController implements interfaces.Controller {
  /**
   * GET /
   */
  @httpGet('') async (ctx: Router.IRouterContext) {
    ctx.status = 200
    ctx.body = {
      name: pkg.name,
      version: pkg.version,
      env: process.env.NODE_ENV,
      up: process.uptime(),
      message: 'ok'
    }
  }
}