import { getResponse } from '../utils/index.mjs'

const auth = async (ctx, next) => {
  const user = ctx.session?.user
  if (!user) {
    ctx.body = getResponse({
      status: 'error',
      msg: 'please login first'
    })
    return
  }
  await next()
}

export default auth
