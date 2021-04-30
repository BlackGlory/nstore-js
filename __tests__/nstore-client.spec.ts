import { server } from '@test/nstore.mock'
import { NStoreClient, NotFound } from '@src/nstore-client'
import { TOKEN } from '@test/utils'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'
import 'jest-extended'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('NStoreClient', () => {
  test(`
    set(namespace: string, id: bigint, payload: string): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n
    const doc = 'message'

    const result = client.set(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    setJSON(namespace: string, id: bigint, payload: Json): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n
    const doc = { message: 'message' }

    const result = client.setJSON(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    setCSV<T extends object>(
      namespace: string
    , id: bigint
    , payload: T[]
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n
    const doc = [{ message: 'message' }]

    const result = client.setCSV(namespace, id, doc)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  describe('has(namespace, string, id: bigint): Promise<boolean>', () => {
    describe('exist', () => {
      it('return true', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.has(namespace, 200n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeTrue()
      })
    })

    describe('not exist', () => {
      it('return false', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.has(namespace, 404n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeFalse()
      })
    })
  })

  describe(`
    get(
      namespace: string
    , id: string
    ): Promise<{ revision: string; payload: string }>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.get(namespace, 1n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: 'text'
        })
      })
    })

    describe('not exist', () => {
      it('throw NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.get(namespace, 404n)
        const err = await getErrorPromise(result)

        expect(result).toBePromise()
        expect(err).toBeInstanceOf(NotFound)
      })
    })
  })

  describe(`
    tryGet(
      namespace: string
    , id: bigint
    ): Promise<{ revision: string; payload: string } | null>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGet(namespace, 1n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: 'text'
        })
      })
    })

    describe('not exist', () => {
      it('return null', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGet(namespace, 404n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeNull()
      })
    })
  })

  describe(`
    getJSON(
      namespace: string
    , id: bigint
    ): Promise<{ revision: string; payload: Json }>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getJSON(namespace, 2n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: { 'hello': 'world' }
        })
      })
    })

    describe('not exist', () => {
      it('throw NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getJSON(namespace, 404n)
        const err = await getErrorPromise(result)

        expect(result).toBePromise()
        expect(err).toBeInstanceOf(NotFound)
      })
    })
  })

  describe(`
    tryGetJSON(
      namespace: string
    , id: bigint
    ): Promise<{ revision: string; payload: Json } | null>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetJSON(namespace, 2n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: { 'hello': 'world' }
        })
      })
    })

    describe('not exist', () => {
      it('throw NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetJSON(namespace, 404n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeNull()
      })
    })
  })

  describe(`
    getCSV<T extends object>(
      namespace: string
    , id: bigint
    ): Promise<{ revision: string; payload: T[] }>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getCSV(namespace, 3n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: [
            { key: 'hello', value: 'world' }
          ]
        })
      })
    })

    describe('not exist', () => {
      it('thrown NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.getCSV(namespace, 404n)
        const err = await getErrorPromise(result)

        expect(result).toBePromise()
        expect(err).toBeInstanceOf(NotFound)
      })
    })
  })

  describe(`
    tryGetCSV<T extends object>(
      namespace: string
    , id: bigint
    ): Promise<{ revision: string; payload: T[] } | null>
  `, () => {
    describe('exist', () => {
      it('return item', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetCSV(namespace, 3n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toStrictEqual({
          revision: 'revision'
        , payload: [
            { key: 'hello', value: 'world' }
          ]
        })
      })
    })

    describe('not exist', () => {
      it('thrown NotFound', async () => {
        const client = createClient()
        const namespace = 'namespace'

        const result = client.tryGetCSV(namespace, 404n)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBeNull()
      })
    })
  })
  test('getAllItemIds(namespace: string): Promise<bigint[]>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getAllItemIds(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual([1n])
  })

  test('getAllNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getAllNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('del(namespace: string, id: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const id = 1n

    const result = client.del(namespace, id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('clear(namespace: string): Prmise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.clear(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test(`
    stats(namespace: string): Promise<{ namespace: string; items: number }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.stats(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      namespace
    , items: 1
    })
  })
})

function createClient() {
  return new NStoreClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
