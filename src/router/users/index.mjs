import Router from '@koa/router'
import userModel from '../../models/user.mjs'
import { getResponse } from '../../utils/index.mjs'

const usersRouter = new Router()

// 查询所有`user`
usersRouter.get('/', async (ctx) => {
  const users = await userModel.find()
  ctx.body = getResponse({ data: users })
})

// 查看单个`user`
usersRouter.get('/:id', async (ctx) => {
  try {
    const user = (await userModel.findById(ctx.params.id)) || {}
    ctx.body = getResponse({ data: user })
  } catch (err) {
    ctx.body = getResponse({
      status: 'error',
      msg: err.message || '',
      data: {}
    })
  }
})

// 新增`user`
usersRouter.post('/', async (ctx) => {
  const { name, email, password } = ctx.request.body
  await userModel.create({ name, email, password })
  ctx.body = getResponse({ msg: 'save successfully' })
})

// 删除指定`user`
usersRouter.delete('/', async (ctx) => {
  await userModel.deleteOne({ name: ctx.params.name })
  ctx.body = getResponse({
    msg: 'delete successfully'
  })
})

// 更新指定`user`
usersRouter.put('/', async (ctx) => {
  const data = ctx.request.body
  const updatedData = await userModel.findByIdAndUpdate(data.id, data, {
    new: true // 返回更新后数据
  })
  ctx.body = getResponse({ msg: 'update successfully', data: updatedData })
})

export default usersRouter
