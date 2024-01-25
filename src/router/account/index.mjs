import Router from '@koa/router'
import bcrypt from 'bcryptjs'
import { getResponse } from '../../utils/index.mjs'
import userModel from '../../models/user.mjs'

const accountRouter = new Router()

// 登录
accountRouter.post('/signin', async (ctx) => {
  let { name, password } = ctx.request.body
  const user = await userModel.findOne({ name })
  if (user && (await bcrypt.compare(password, user.password))) {
    ctx.session.user = {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email
    }
    ctx.body = getResponse({
      msg: 'signin successfully'
    })
  } else {
    ctx.body = getResponse({
      msg: 'name or password is incorrect',
      status: 'error'
    })
  }
})

// 注册
accountRouter.post('/signup', async (ctx) => {
  let { name, email, password } = ctx.request.body
  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)
  const user = {
    name,
    email,
    password
  }
  const result = await userModel.create(user)
  ctx.body = getResponse({
    msg: 'signup successfully',
    data: result
  })
})

// 登出
accountRouter.post('/signout', async (ctx) => {
  ctx.session = null
  ctx.body = getResponse({
    msg: 'signout successfully'
  })
})

export default accountRouter
