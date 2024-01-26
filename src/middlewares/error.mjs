import { getResponse } from '../utils/index.mjs'

const error = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = getResponse({
      status: 'error',
      msg: err?.message || 'Internal Server Error'
    })
  }
}

export default error
