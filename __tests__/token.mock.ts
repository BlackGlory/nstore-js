import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth } from '@test/utils'

export const server = setupServer(
  rest.get('/admin/nstore-with-tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })

, rest.get('/admin/nstore/:namespace/tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json([
        {
          token: 'token'
        , write: true
        , read: false
        , delete: false
        }
      ])
    )
  })

, rest.put('/admin/nstore/:namespace/tokens/:token/write', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/nstore/:namespace/tokens/:token/write', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/nstore/:namespace/tokens/:token/read', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/nstore/:namespace/tokens/:token/read', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/nstore/:namespace/tokens/:token/delete', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/nstore/:namespace/tokens/:token/delete', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
