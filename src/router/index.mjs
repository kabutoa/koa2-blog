import Router from '@koa/router'
import usersRouter from './users/index.mjs'
import accountRouter from './account/index.mjs'
import postsRouter from './posts/index.mjs'
const indexRouter = new Router()

indexRouter.get('/', async (ctx) => {
  await ctx.render('index', {
    title: '首页',
    user: ctx.session.user
  })
})

indexRouter.get('/signin', async (ctx) => {
  await ctx.render('signin', {
    title: '登录'
  })
})

indexRouter.get('/signup', async (ctx) => {
  await ctx.render('signup', {
    title: '注册'
  })
})

indexRouter.use('/api/users', usersRouter.routes(), usersRouter.allowedMethods())
indexRouter.use('/api/account', accountRouter.routes(), accountRouter.allowedMethods())
indexRouter.use('/api/posts', postsRouter.routes(), postsRouter.allowedMethods())

export default indexRouter
