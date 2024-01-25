import Koa from 'koa'
import session from 'koa-session'
import serve from 'koa-static'
import render from 'koa-nunjucks-2'
import indexRouter from './router/index.mjs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { port } from './config/index.mjs'
import { close, connect } from './db/index.mjs'
import logger from './middlewares/logger.mjs'

const app = new Koa()

app.keys = ['my-secret-key']
app.use(session(app))

app.use(logger).use(cors()).use(bodyParser())

app.use(async (ctx, next) => {
  await connect()
  await next()
  await close()
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(serve(path.join(__dirname, './public'))).use(
  render({
    ext: 'html',
    path: path.join(__dirname, './views')
  })
)

app.use(indexRouter.routes()).use(indexRouter.allowedMethods())

app.listen(port)
