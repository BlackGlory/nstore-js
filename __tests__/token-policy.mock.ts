import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth, badJson } from '@test/utils'

export const server = setupServer(
  rest.get('/admin/nstore-with-token-policies', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })

, rest.get('/admin/nstore/:namespace/token-policies', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json({
        writeTokenRequired: true
      , readTokenRequired: false
      , deleteTokenRequired: null
      })
    )
  })

, rest.put('/admin/nstore/:namespace/token-policies/write-token-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/admin/nstore/:namespace/token-policies/write-token-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/nstore/:namespace/token-policies/read-token-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/admin/nstore/:namespace/token-policies/read-token-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.put('/admin/nstore/:namespace/token-policies/delete-token-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))
    if (badJson(req)) return res(ctx.status(400))

    return res(ctx.status(204))
  })

, rest.delete('/admin/nstore/:namespace/token-policies/delete-token-required', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
