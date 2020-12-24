import Koa from 'koa'
import jsend from 'koa-jsend'
import koaBody from 'koa-body'
import health from 'koa-simple-healthcheck'
import koaValidator from 'koa-async-validator'
import { loadControllers, scopePerRequest } from 'awilix-koa'
import Debug from 'debug'

import container from '../../container'

export default () => {
  const app = new Koa()
  const logging = Debug('http')

  app.use(jsend())
  app.use(koaBody({ jsonLimit: '100mb', parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'] }))
  app.use(koaValidator())

  app.use(async (ctx, next) => {
    const start = new Date().getTime()

    await next().then(() => {
      const elapsed = new Date().getTime() - start
      logging(`${ctx.request.method} ${ctx.request.url} ${JSON.stringify(ctx.response.status)} ${elapsed}ms`)
      logging(`[header] ${JSON.stringify(ctx.request.header)}`)
      logging(`[body] ${JSON.stringify(ctx.request.body)}`)
    })
  })

  app.use(scopePerRequest(container))

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      const message = ctx.status === 500 ? 'Internal Server Error' : err.message
      ctx.error(message, null, err?.code)
      ctx.app.emit('error', err, ctx)
    }
  })

  app.use(loadControllers('../../web/rest/*Controller.js', { cwd: __dirname }))

  // GET /healthcheck
  app.use(
    health({
      healthy() {
        return { healthy: true }
      },
    }),
  )

  app.on('error', err => {
    // eslint-disable-next-line no-console
    console.error(err)
  })

  return app
}
