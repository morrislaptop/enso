import {
  ServerAbstract,
  bodyparser,
  cors,
  morgan
} from '@enso/framework'

export class App extends ServerAbstract {

  applyMiddleware (koa): void {
    koa.use(bodyparser())
    koa.use(cors())
    koa.use(morgan('combined'))
    koa.use(morgan('dev'))
  }
}
