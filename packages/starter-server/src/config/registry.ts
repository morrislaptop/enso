import { Container } from 'inversify'
import { interfaces } from 'inversify-koa'
import { $b } from '@enso/framework'

import { IndexController } from '../IndexController'

let container = new Container()
container.bind<interfaces.Controller>($b.Controller).to(IndexController)
  .whenTargetNamed('IndexController')

export {
  container
}