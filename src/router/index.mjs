import Router from '@koa/router'
import usersRouter from './users/index.mjs'

const indexRouter = new Router({
  prefix: '/api'
})

indexRouter.use('/users', usersRouter.routes(), usersRouter.allowedMethods())

export default indexRouter
