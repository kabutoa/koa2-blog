import Router from '@koa/router'
import postModel from '../../models/post.mjs'
import { getResponse } from '../../utils/index.mjs'
import auth from '../../middlewares/auth.mjs'

const postsRouter = new Router()

// 查询所有`post`
postsRouter.get('/', async (ctx) => {
  const posts = await postModel.find()
  ctx.body = getResponse({ data: posts })
})

// 查看单个`post`
postsRouter.get('/:id', async (ctx) => {
  try {
    const post = (await postModel.findById(ctx.params.id)) || {}
    ctx.body = getResponse({ data: post })
  } catch (err) {
    ctx.body = getResponse({
      status: 'error',
      msg: err.message || '',
      data: {}
    })
  }
})

// 新增`post`
postsRouter.post('/', auth, async (ctx) => {
  const { title, content, author } = ctx.request.body
  const post = {
    title,
    content,
    author
  }
  await postModel.create(post)
  ctx.body = getResponse({ msg: 'save successfully' })
})

// 删除指定`post`
postsRouter.delete('/', async (ctx) => {
  await postModel.deleteOne({ id: ctx.params.id })
  ctx.body = getResponse({
    msg: 'delete successfully'
  })
})

// 更新指定`user`
postsRouter.put('/', async (ctx) => {
  const data = ctx.request.body
  const updatedData = await postModel.findByIdAndUpdate(data.id, data, {
    new: true // 返回更新后数据
  })
  ctx.body = getResponse({ msg: 'update successfully', data: updatedData })
})

export default postsRouter
