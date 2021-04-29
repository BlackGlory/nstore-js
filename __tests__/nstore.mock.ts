import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badToken } from '@test/utils'

export const server = setupServer(
  rest.put('/nstore/:namespace/items/:id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(204)
    )
  })

, rest.head('/nstore/:namespace/items/:id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    )
  })

, rest.get('/nstore/:namespace/items/text', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.text('text')
    )
  })

, rest.get('/nstore/:namespace/items/json', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.json({ hello: 'world' })
    )
  })

, rest.get('/nstore/:namespace/items/csv', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.set('ETag', 'revision')
    , ctx.text('key,value\r\nhello,world')
    )
  })

, rest.get('/nstore/:namespace/items', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json(['id'])
    )
  })

, rest.get('/nstore/:namespace/stats', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json({
        namespace: req.params.namespace
      , items: 1
      })
    )
  })

, rest.delete('/nstore/:namespace/items/:id', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/nstore/:namespace', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.get('/nstore', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(['namespace'])
    )
  })
)
